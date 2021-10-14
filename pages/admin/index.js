import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import AdminPanelLayout from '../../components/AdminPanelLayout'
import useAdminAuth from '../../auth/useAdminAuth' 
function Home() {
  return (
    <>
      <AdminPanelLayout>
        <div className={styles.container}>
          <div className={styles.main}>
            <h1 className={styles.title}>
              Welcome to AstroChrcha
            </h1>

            <p className={styles.description}>
              One stop solution for all your queries related to astro{" "}
            </p>
          </div>
        </div>
      </AdminPanelLayout>
    </>
  );
}
export default useAdminAuth(Home);