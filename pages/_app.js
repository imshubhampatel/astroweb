import '../styles/globals.css'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css'
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
import Head from 'next/head'
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-TG28SWS' });
    }, []);

  const getLayout = Component.getLayout ||
    ((page) => {

      return (
        <Layout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          {page}
        </Layout>
      )
    })

  return getLayout(<Component {...pageProps} />)



}

export default MyApp
