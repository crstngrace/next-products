import getConfig from 'next/config';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css';

const { publicRuntimeConfig } = getConfig();

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  if (publicRuntimeConfig.ENV === 'production') {
    console.log = function () {};
  }

  return (
    <>
      <Head>
        <title>Products Page</title>
        <link rel='icon' type='image/png' href='./favicon.png' />
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        <meta property='og:title' content='Products Page' />
        <meta property='og:description' content='Products Page' />
        <meta property='og:image' content='./favico.ico' />
        <meta property='og:image:width' content='120'></meta>
        <meta property='og:image:height' content='627'></meta>
        <meta property='og:type' content='website' />
        <meta name='robots' content='noindex, nofollow, noimageindex' />
        <meta name='googlebot' content='noindex, nofollow' />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
