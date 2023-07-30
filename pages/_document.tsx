import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="Nutrition Plans" />
        <meta name="twitter:card" content="Nutrition Plans website" />
        <meta name="twitter:description" content="Nutrition Plans" />
        <meta name="twitter:title" content="Nutrition Plans" />
        <meta property="og:description" content="Nutrition Plans" />
        <meta property="og:site_name" content="nutritionplans.co" />
        <meta property="og:title" content="Nutrition Plans" />

        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="robots" content="all" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
