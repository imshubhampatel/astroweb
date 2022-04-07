
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
        return (
          <>
          {/* <!-- Google Tag Manager (noscript) --> */}
          {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TG28SWS"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript> */}
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <div className="vh-100 d-flex flex-column" >
            <Navbar />

            <div className="flex-fill" >

            {children}
            </div>
            <Footer/>     
          </div>
          </>

        );
};

export default Layout;
