import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0D9488" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/imperial-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/imperial-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/imperial-512.png" />
        <meta name="apple-mobile-web-app-title" content="Imperial Measurement Calculator" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
