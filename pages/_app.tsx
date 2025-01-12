import "../styles.css";
import React, { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SpeedInsights } from "@vercel/speed-insights/next"

import Head from "next/head";

const App = ({ Component, pageProps }) => {

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        nonce: undefined,
      }}
      >
        <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
        <script async src="/stats/script.js" data-website-id="bceb8dd7-4f73-4545-8bb8-74397861dce1"></script> 
        </Head>
      <Component {...pageProps} />
      <SpeedInsights />
    </GoogleReCaptchaProvider>
  );
};

export default App;
