import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/pwa/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/pwa/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/pwa/favicon-16x16.png"
        />
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
        <meta
          name="keywords"
          content="nutrition plans, diet plan, healthy eating, meal planning, calorie counting, weight loss, balanced diet, vegetarian diet, keto diet, low carb diet, gluten free diet, mediterranean diet"
        />

        <link rel="alternate" hrefLang="en" href="https://nutritionplans.co" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="author" content="Nutrition Plans CO" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="robots" content="all" />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
