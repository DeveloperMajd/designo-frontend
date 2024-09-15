import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      try {
        // hack for Google Analytics to track page transitions
        if ((window as any)?.gaData) {
          const gaKey = Object.keys((window as any).gaData)[0];
          (window as any)?.gtag("config", gaKey, {
            page_path: url,
          });
        }
        // hack for Matomo to track page transitions
        if (window && (window as any)._paq) {
          (window as any)._paq.push(["setCustomUrl", url]);
          (window as any)._paq.push(["setDocumentTitle", document.title]);
          (window as any)._paq.push(["trackPageView"]);
        }
      } catch (e) {
        // Fail silently
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* you can add metadata here, for all pages */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
