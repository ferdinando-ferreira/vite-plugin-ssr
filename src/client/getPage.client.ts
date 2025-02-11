import { getPageFile } from '../page-files/getPageFiles.shared'
import { addPageIdToPageContext, addUrlToPageContext, getUrlFull, getUrlPathname } from '../utils'
import { assert, assertUsage, assertWarning } from '../utils/assert'
import { getPageContextProxy } from './getPageContextProxy'

export { getPage }
export { getPageById }
export { getPageInfo }

const urlPathnameOriginal = getUrlPathname()
const urlFullOriginal = getUrlFull()

async function getPage(): Promise<{
  Page: any
  pageContext: Record<string, any>
}> {
  let { pageId, pageContext } = getPageInfo()
  assert(pageContext.urlFull && pageContext.urlPathname)
  const Page = await getPageById(pageId)
  pageContext = getPageContextProxy(pageContext)
  assertPristineUrl()
  return {
    Page,
    pageContext,
    // @ts-ignore
    get pageProps() {
      assertUsage(
        false,
        "`pageProps` in `const { pageProps } = await getPage()` has been replaced with `const { pageContext } = await getPage()`. The `setPageProps()` hook is deprecated: instead, return `pageProps` in your `addPageContext()` hook and use `passToClient = ['pageProps']` to pass `context.pageProps` to the browser. See `BREAKING CHANGE` in `CHANGELOG.md`."
      )
    }
  }
}

function assertPristineUrl() {
  const urlPathnameCurrent = getUrlPathname()
  assertWarning(
    urlPathnameOriginal === urlPathnameCurrent,
    `\`getPage()\` returned page information for URL \`${urlPathnameOriginal}\` instead of \`${urlPathnameCurrent}\`. If you want to be able to change the URL (e.g. with \`window.history.pushState\`) while using \`getPage()\`, then create a new GitHub issue.`
  )
}

async function getPageById(pageId: string): Promise<any> {
  assert(typeof pageId === 'string')
  const pageFile = await getPageFile('.page', pageId)
  assert(pageFile)
  const { filePath, loadFile } = pageFile
  const fileExports = await loadFile()
  assertUsage(
    typeof fileExports === 'object' && ('Page' in fileExports || 'default' in fileExports),
    `${filePath} should have a \`export { Page }\` (or a default export).`
  )
  const Page = fileExports.Page || fileExports.default
  return Page
}

function getPageInfo(): {
  pageId: string
  pageContext: Record<string, unknown>
} {
  const pageContext: Record<string, unknown> = {}
  Object.assign(pageContext, window.__vite_plugin_ssr__pageContext)
  addUrlToPageContext(pageContext, urlFullOriginal)

  assert(typeof pageContext.pageId === 'string')
  const { pageId } = pageContext

  return { pageId, pageContext }
}

declare global {
  interface Window {
    __vite_plugin_ssr__pageContext: Record<string, unknown>
  }
}
