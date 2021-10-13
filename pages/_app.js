import '../styles/globals.css'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {



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
