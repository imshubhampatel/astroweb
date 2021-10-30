import AdminLayout from '../../components/adminPanel/layout'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import useAdminAuth from '../../auth/useAdminAuth'

const Home = useAdminAuth(() => {
  return (
    <>
   
    <div className = "" >
      <Head>
        <title>AstroChrcha</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/private">AstroChrcha</a>
        </h1>

        <p className = "">
          One stop solution for all your queries related to astro{" "}
        </p>
      </main>  
      </div>
      </>
  );
})
Home.getLayout = function getLayout(page) {
  return (<AdminLayout>{page}</AdminLayout>);
};


export default (Home);
