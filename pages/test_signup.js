import RegistrationForm from "../components/RegistrationForm2";
import Head from 'next/head'

export default function Page() {
  return <RegistrationForm />;
}

Page.getLayout = (page) => {

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {page}
      </>
    )
  }
