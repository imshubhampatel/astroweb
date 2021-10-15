
import Sidebar from "./sidebar";
import Head from 'next/head'

const Layout = ({ children, ...props }) => {


    return (

        <>

            <Head>

                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>

            <div className="container-fluid  p-0" >

                <div className="d-flex justify-content-start vh-100 "  >

                    <div className="" >
                    <Sidebar {...props} />

                    </div>
                    

                    <div className="flex-fill overflow-auto">

                    {children}
                    </div>


                </div>



            </div>

        </>
    );
};

export default Layout;
