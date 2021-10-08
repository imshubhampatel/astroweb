import React from 'react'

function Sidebar() {
    return (
      <div>
        <h2>Side Bar</h2>
        <div>
          <button className="btn btn-primary col-11 mb-2 mt-2 ml-2">
            {" "}
            Home
          </button>
        </div>
        <div>
          <button className="btn btn-primary col-11 mb-2 mt-2 ml-2">
            {" "}
            User Management{" "}
          </button>
        </div>
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Astrologer Management{" "}
          </button>
        </div>{" "}
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Wallet Management{" "}
          </button>
        </div>{" "}
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Store Management{" "}
          </button>
        </div>
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Manage Broadcast & Blogs{" "}
          </button>
        </div>
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Notification & Ads{" "}
          </button>
        </div>
        <div>
          <button className="btn btn-primary  col-11 mb-2 mt-2 ml-2">
            {" "}
            Employee Management{" "}
          </button>
        </div>
      </div>
    );
}

export default Sidebar
