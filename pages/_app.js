import '../styles/globals.css'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css'
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
