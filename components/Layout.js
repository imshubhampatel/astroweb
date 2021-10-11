
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
        return (
          <div className="vh-100 d-flex flex-column   ">
            <Navbar />

            <div className="flex-fill" >

            {children}
            </div>
            <Footer/>     
          </div>
        );
};

export default Layout;
