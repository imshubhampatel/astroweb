import { Router } from 'next/router';
import React from 'react'

function Sidebar() {

    return (
      <div className="vh-100">
        <h2>Side Bar</h2>
        <div>
          <a className="btn btn-primary col-11 mb-2 mt-2 ml-2">
            {" "}
            Home
          </a>
        </div>
        <div>
          <a className="btn btn-primary col-11 mb-2 mt-2 ml-2">
            {" "}
            User Management{" "}
          </a>
        </div>
        <div>
          <a
            className="btn btn-primary  col-11 mb-2 mt-2 ml-2"
            href="admin/astrologermanagement"
          >
            {" "}
            Astrologer Management{" "}
          </a>
        </div>{" "}
        <div>
          <a className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Wallet Management{" "}
          </a>
        </div>{" "}
        <div>
          <a className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Store Management{" "}
          </a>
        </div>
        <div>
          <a className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Manage Broadcast & Blogs{" "}
          </a>
        </div>
        <div>
          <a className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Notification & Ads{" "}
          </a>
        </div>
        <div>
          <a className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Employee Management{" "}
          </a>
        </div>
      </div>
    );
}

export default Sidebar
