import { Html, Head, Main, NextScript } from "next/document";

// Sections that animate in on scroll are rendered hidden (opacity 0) and shown by Motion
// once the JavaScript runs. Without JavaScript that never happens, so show them as they are.
const noScriptStyles = `[style*="opacity:0"] { opacity: 1 !important; transform: none !important; }`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
