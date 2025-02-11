export type ReactComponent = (pageProps: PageProps) => JSX.Element;
export type PageProps = {};
export type PageContext = {
  pageProps: PageProps;
  documentProps?: {
    title?: string;
    description?: string;
  };
};
