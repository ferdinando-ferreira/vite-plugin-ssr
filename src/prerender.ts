import './page-files/setup.node'
import fs from 'fs'
const { writeFile, mkdir } = fs.promises
import { join, sep, dirname } from 'path'
import { getFilesystemRoute, getPageIds, isErrorPage, isStaticRoute, loadPageRoutes, route } from './route.shared'
import { assert, assertUsage, assertWarning, hasProp, getFileUrl, moduleExists, isPlainObject } from './utils'
import { setSsrEnv } from './ssrEnv.node'
import { getPageFunctions, prerenderPage, renderStatic404Page } from './renderPage.node'
import { blue, green, gray, cyan } from 'kolorist'
import { version } from './package.json'

export { prerender }

type HtmlDocument = {
  url: string
  htmlDocument: string
  pageContextSerialized: string | null
  doNotCreateExtraDirectory?: true
}

/**
 * Render your pages (e.g. for deploying to a static host).
 * @param partial Allow only a subset of pages to be pre-rendered.
 * @param root The root directory of your project (where `vite.config.js` and `dist/` live) (default: `process.cwd()`).
 */
async function prerender({
  partial = false,
  root = process.cwd(),
  clientRouter = false,
  base
}: {
  partial?: boolean
  root?: string
  clientRouter?: boolean
  base?: string
} = {}) {
  assertArguments(partial, clientRouter, base)
  console.log(`${cyan(`vite-plugin-ssr ${version}`)} ${green('pre-rendering HTML...')}`)

  const { pluginManifest, pluginManifestPath } = getPluginManifest(root)
  assertUsage(
    pluginManifest !== null,
    "You are trying to run `$ vite-plugin-ssr prerender` but you didn't build your app yet: make sure to run `$ vite build && vite build --ssr` before running the pre-rendering. (Following build manifest is missing: `" +
      pluginManifestPath +
      '`.)'
  )
  assertUsage(
    pluginManifest.version === version,
    `Remove \`dist/\` and re-build your app \`$ vite build && vite build --ssr && vite-plugin-ssr prerender\`. (You are using \`vite-plugin-ssr@${version}\` but your build has been generated with a different version \`vite-plugin-ssr@${pluginManifest.version}\`.)`
  )
  const pageContextNeeded: boolean = pluginManifest.doesClientSideRouting
  const baseUrl: string = pluginManifest.base

  process.env.NODE_ENV = 'production'
  setSsrEnv({
    isProduction: true,
    root,
    viteDevServer: undefined,
    baseUrl
  })

  const allPageIds = (await getPageIds()).filter((pageId) => !isErrorPage(pageId))
  const pageRoutes = await loadPageRoutes()

  const prerenderData: Record<
    string,
    {
      prerenderSourceFile: string
      pageContext: Record<string, unknown>
      noPrenderPageContext: boolean
    }
  > = {}
  await Promise.all(
    allPageIds.map(async (pageId) => {
      const { prerenderFunction } = await getPageFunctions(pageId)
      if (!prerenderFunction) return
      const prerenderSourceFile = prerenderFunction.filePath
      const prerenderResult = await prerenderFunction.prerender()
      const result = normalizePrerenderResult(prerenderResult, prerenderSourceFile)
      result.forEach(({ url, pageContext }) => {
        assert(typeof url === 'string')
        assert(url.startsWith('/'))
        assert(pageContext === null || isPlainObject(pageContext))
        if (!('url' in prerenderData)) {
          prerenderData[url] = {
            pageContext: {},
            noPrenderPageContext: true,
            prerenderSourceFile
          }
        }
        if (pageContext) {
          prerenderData[url].noPrenderPageContext = false
          prerenderData[url].pageContext = {
            ...prerenderData[url].pageContext,
            ...pageContext
          }
        }
      })
    })
  )

  const htmlDocuments: HtmlDocument[] = []
  const renderedPageIds: Record<string, true> = {}

  // Render URLs renturned by `prerender()` hooks
  await Promise.all(
    Object.entries(prerenderData).map(async ([url, { pageContext, prerenderSourceFile, noPrenderPageContext }]) => {
      const routeResult = await route(url, allPageIds, pageContext)
      assertUsage(
        routeResult,
        `The \`prerender()\` hook defined in \`${prerenderSourceFile}\ returns an URL \`${url}\` that doesn't match any page route. Make sure the URLs returned by \`prerender()\` hooks to always match the URL of a page.`
      )
      const { pageId } = routeResult
      const { htmlDocument, pageContextSerialized } = await prerenderPage(
        pageId,
        { ...pageContext, ...routeResult.pageContextAddendum },
        url,
        !noPrenderPageContext,
        pageContextNeeded
      )
      htmlDocuments.push({ url, htmlDocument, pageContextSerialized })
      renderedPageIds[pageId] = true
    })
  )

  // Render pages that have a static route
  await Promise.all(
    allPageIds
      .filter((pageId) => !renderedPageIds[pageId])
      .map(async (pageId) => {
        let url
        const pageContext = {
          routeParams: {}
        }
        // Route with filesystem
        if (!(pageId in pageRoutes)) {
          url = getFilesystemRoute(pageId, allPageIds)
          assert(url.startsWith('/'))
        } else {
          const { pageRoute } = pageRoutes[pageId]
          if (typeof pageRoute === 'string' && isStaticRoute(pageRoute)) {
            assert(pageRoute.startsWith('/'))
            url = pageRoute
          } else {
            assertWarning(
              partial,
              `Cannot pre-render page \`${pageId}.page.*\` because it has a non-static route and no \`prerender()\` hook returned (an) URL(s) matching the page's route. Use the --partial option to suppress this warning.`
            )
            return
          }
        }
        const { htmlDocument, pageContextSerialized } = await prerenderPage(
          pageId,
          pageContext,
          url,
          false,
          pageContextNeeded
        )
        htmlDocuments.push({ url, htmlDocument, pageContextSerialized })
      })
  )

  if (!htmlDocuments.find(({ url }) => url === '/404')) {
    const result = await renderStatic404Page()
    if (result) {
      const url = '/404'
      const { htmlDocument } = result
      htmlDocuments.push({ url, htmlDocument, pageContextSerialized: null, doNotCreateExtraDirectory: true })
    }
  }

  console.log(`${green(`✓`)} ${htmlDocuments.length} HTML documents pre-rendered.`)

  // `htmlDocuments.length` can be very big; to avoid `EMFILE, too many open files` we don't parallelize the writing
  for (const htmlDoc of htmlDocuments) {
    await writeHtmlDocument(htmlDoc, root)
  }
}

async function writeHtmlDocument(
  { url, htmlDocument, pageContextSerialized, doNotCreateExtraDirectory }: HtmlDocument,
  root: string
) {
  assert(url.startsWith('/'))

  const writeJobs = [write(url, '.html', htmlDocument, root, doNotCreateExtraDirectory)]
  if (pageContextSerialized !== null) {
    writeJobs.push(write(url, '.pageContext.json', pageContextSerialized, root, doNotCreateExtraDirectory))
  }
  await Promise.all(writeJobs)
}

async function write(
  url: string,
  fileExtension: '.html' | '.pageContext.json',
  fileContent: string,
  root: string,
  doNotCreateExtraDirectory?: true
) {
  const fileUrl = getFileUrl(url, fileExtension, doNotCreateExtraDirectory)
  assert(fileUrl.startsWith('/'))
  const filePathRelative = fileUrl.slice(1).split('/').join(sep)
  assert(!filePathRelative.startsWith(sep))
  const filePath = join(root, 'dist', 'client', filePathRelative)
  await mkdirp(dirname(filePath))
  await writeFile(filePath, fileContent)
  console.log(`${gray(join('dist', 'client') + sep)}${blue(filePathRelative)}`)
}

function mkdirp(path: string): Promise<string | undefined> {
  return mkdir(path, { recursive: true })
}

function normalizePrerenderResult(
  prerenderResult: unknown,
  prerenderSourceFile: string
): { url: string; pageContext: null | Record<string, unknown> }[] {
  if (Array.isArray(prerenderResult)) {
    return prerenderResult.map(normalize)
  } else {
    return [normalize(prerenderResult)]
  }

  function normalize(prerenderElement: unknown): { url: string; pageContext: null | Record<string, unknown> } {
    if (typeof prerenderElement === 'string') return { url: prerenderElement, pageContext: null }

    const errMsg1 = `The \`prerender()\` hook defined in \`${prerenderSourceFile}\` returned an invalid value`
    const errMsg2 =
      'Make sure your `prerender()` hook returns an object `{ url, pageContext }` or an array of such objects.'
    assertUsage(isPlainObject(prerenderElement), `${errMsg1}. ${errMsg2}`)
    assertUsage(hasProp(prerenderElement, 'url'), `${errMsg1}: \`url\` is missing. ${errMsg2}`)
    assertUsage(
      typeof prerenderElement.url === 'string',
      `${errMsg1}: unexpected \`url\` of type \`${typeof prerenderElement.url}\`.`
    )
    assertUsage(
      prerenderElement.url.startsWith('/'),
      `${errMsg1}: the \`url\` with value \`${prerenderElement.url}\` doesn't start with \`/\`. Make sure each URL starts with \`/\`.`
    )
    Object.keys(prerenderElement).forEach((key) => {
      assertUsage(key === 'url' || key === 'pageContext', `${errMsg1}: unexpected object key \`${key}\` ${errMsg2}`)
    })
    if (!hasProp(prerenderElement, 'pageContext')) {
      prerenderElement = { ...prerenderElement, pageContext: null }
    }
    assertUsage(
      hasProp(prerenderElement, 'pageContext') &&
        (prerenderElement.pageContext === null || isPlainObject(prerenderElement.pageContext)),
      `The \`prerender()\` hook exported by ${prerenderSourceFile} returned an invalid \`pageContext\` value: make sure \`pageContext\` is a plain JavaScript object.`
    )
    return prerenderElement as any
  }
}

type PluginManifest = {
  version: string
  base: string
  doesClientSideRouting: boolean
}
function getPluginManifest(
  root: string
): {
  pluginManifest: PluginManifest | null
  pluginManifestPath: string
} {
  const pluginManifestPath = `${root}/dist/client/vite-plugin-ssr.json`
  if (!moduleExists(pluginManifestPath)) {
    return { pluginManifest: null, pluginManifestPath }
  }

  let manifestContent: unknown = require(pluginManifestPath)
  assert(hasProp(manifestContent, 'version'))
  assert(hasProp(manifestContent, 'base'))
  assert(hasProp(manifestContent, 'doesClientSideRouting'))
  const { base, doesClientSideRouting } = manifestContent
  assert(typeof doesClientSideRouting === 'boolean')
  assert(typeof base === 'string')

  const pluginManifest = { version, base, doesClientSideRouting }
  return { pluginManifest, pluginManifestPath }
}

function assertArguments(partial: unknown, clientRouter: unknown, base: unknown) {
  assertUsage(partial === true || partial === false, '[prerender()] Option `partial` should be a boolean.')
  assertWarning(clientRouter === false, '[prerender()] Option `clientRouter` is deprecated and has no-effect.')
  assertWarning(base === undefined, '[prerender()] Option `base` is deprecated and has no-effect.')
}
