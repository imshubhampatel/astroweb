import React from 'react'
import Sidebar from './Sidebar'
import styles from "../styles/Home.module.css";

function AdminPanelLayout({children}) {
    return (
      <div className="container-fluid">
        <div className="row" >
          <div className="col-2 bg-dark">
            <Sidebar></Sidebar>
          </div>
          <div className="col-10">{children}</div>
        </div>
      </div>
    );
}

export default AdminPanelLayout
