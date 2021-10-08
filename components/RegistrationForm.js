import React from 'react'
import styles from "../styles/Home.module.css";
import Link from "next/link";

function RegistrationForm(props) {
    const user = props.user;
    return (
      <div>
        <div className={styles.container}>
          <div>
            <hr />
            <h2>Complete Your Registration </h2>
            <div>
              <form onSubmit={props.registerFormHandler}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={user?.email}
                    readOnly={true}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="row">
                  <div class="form-group col">
                    <label for="First Name">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="Second Name">Second Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="SecondName"
                      placeholder="Second Name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="Address"> Complete Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Address"
                    placeholder="Address"
                  />
                </div>
                <div class="form-group">
                  <label for="PhoneNumber"> Phone Number </label>
                  <input
                    type="tel"
                    pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    class="form-control"
                    id="PhoneNumber"
                    placeholder="PhoneNumber"
                  />
                </div>
                <div class="form-group">
                  <label for="Gender">Gender</label>
                  <select class="form-control" id="Gender">
                    <option>Male</option>
                    <option>Female </option>
                    <option>Others</option>
                  </select>
                </div>
                <label>Expertise</label>
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Vedic"
                  />
                  <label class="form-check-label" for="inlineCheckbox1">
                    Vedic
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="Carot"
                  />
                  <label class="form-check-label" for="inlineCheckbox2">
                    Carot
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                    disabled
                  />
                  <label class="form-check-label" for="inlineCheckbox3">
                    Match Making
                  </label>
                </div>
                <div class="input-group mb-3">
                  <label for="inputGroupFile02">
                    {" "}
                    Upload ID verification documents
                  </label>

                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                  />
                </div>
                <div>
                  <hr />
                  <h7>Please read and accept : </h7>
                  <Link href="#">
                    <a> Terms & Conditions</a>
                  </Link>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RegistrationForm
