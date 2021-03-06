import React from 'react';
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-2796SX98SG"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
            }}
          >
          </script>

          <meta name='description' content='プログラミング言語ごとの求人数を一覧で見ることができるサービスです。'/>

          <meta property='og:site_name'        content='Nojov - プログラミング言語別求人数ビューア'/>
          <meta property='og:title'            content='Nojov - プログラミング言語別求人数ビューア'/>
          <meta property='og:description'      content='プログラミング言語ごとの求人数を一覧で見ることができるサービスです。'/>
          <meta property='og:type'             content='website'/>
          <meta property='og:url'              content='https://nojov.kou-pg.com'/>
          <meta property='og:image'            content='https://nojov.kou-pg.com/card.png'/>
          <meta property='og:image:secure_url' content='https://nojov.kou-pg.com/card.png'/>
          <meta property='og:image:width'      content='600'/>
          <meta property='og:image:height'     content='314'/>
          <meta property='og:locale'           content='ja_JP'/>

          <meta name='twitter:card' content='summary_large_image'/>
          <meta name='twitter:site' content='@kou_pg_0131'/>

          <meta property='fb:app_id' content='889570964422469'/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
