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
          property="og:image"
          content="/images/pwa/android-chrome-512x512.png"
        />
        <meta
          property="og:image:secure_url"
          content="/images/pwa/android-chrome-512x512.png"
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
        <meta name="twitter:card" content="Nutrition Plans website" />
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:width" content="512" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nutritionplans.co" />
        <meta property="type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
