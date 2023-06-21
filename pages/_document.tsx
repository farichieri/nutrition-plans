import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="Nutrition Plans" />
        <meta name="twitter:card" content="Nutrition Plans website" />
        <meta name="twitter:description" content="Nutrition Plans" />
        <meta name="twitter:title" content="Nutrition Plans" />
        <meta property="og:description" content="Nutrition Plans" />
        <meta property="og:site_name" content="nutritionplans.co" />
        <meta property="og:title" content="Nutrition Plans" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
