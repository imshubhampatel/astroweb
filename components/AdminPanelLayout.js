import React from 'react'
import Sidebar from './Sidebar'
import styles from "../styles/Home.module.css";

function AdminPanelLayout({children}) {
    return (
      <div className="container-fluid">
        <div class="row" >
          <div class="col-2 bg-dark">
            <Sidebar></Sidebar>
          </div>
          <div class="col-10">{children}</div>
        </div>
      </div>
    );
}

export default AdminPanelLayout
