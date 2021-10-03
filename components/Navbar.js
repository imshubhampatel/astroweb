import React, { Component } from 'react'
import Link from 'next/link'
import Image from "next/image";

export default class Navbar extends Component {
    render() {
      return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <Link href="#">
                <a class="navbar-brand">
                  <Image
                    src="/astrochrchalogo.png"
                    width="100"
                    height="100"
                    class="d-inline-block align-top"
                    alt=""
                  />{" "}
                </a>
              </Link>
              <div class="navbar-header">
                <h2 class="navbar-brand" href="#">
                  AstroChrcha
                </h2>
              </div>
              <button
                type="button"
                class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                  <a href="#" class="nav-item nav-link active">
                    Home
                  </a>
                  <a href="#" class="nav-item nav-link">
                    About Us
                  </a>
                  <a href="#" class="nav-item nav-link">
                    Contact
                  </a>
                </div>
                {/* <div class="navbar-nav ms-auto">
                  <a href="#" class="nav-item nav-link">
                    Login
                  </a>
                </div> */}
              </div>
            </div>
          </nav>
        </>
      );
    }
}
