import Head from "next/head";
import { AppProps } from "next/app";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import "../style.scss";

// next/font serves the fonts from this site, preloads them and adds a fallback sized to
// match, so the text does not jump when they arrive. The styles use them through the
// CSS variables set below (see styles/_global-vars.scss).
const jost = localFont({
  src: "../assets/fonts/Jost-Variable.woff2",
  weight: "100 900",
});

// Only the form's error messages are italic, so this one is not preloaded.
const jostItalic = localFont({
  src: "../assets/fonts/Jost-Italic.woff2",
  weight: "400",
  style: "italic",
  preload: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Animations are left out for visitors who ask their system for less motion.
    <MotionConfig reducedMotion="user">
      <style jsx global>{`
        :root {
          --font-jost: ${jost.style.fontFamily};
          --font-jost-italic: ${jostItalic.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </Head>
      <Component {...pageProps} />
    </MotionConfig>
  );
}

export default MyApp;
