import React from 'react'
import styles from "../styles/Home.module.css";
import Link from "next/link";

function RegistrationForm(props) {
    const Expertise = ['vedicAstrology',"tarotCardReading","numerlogy","matchMaking"]
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
                    required
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="row">
                  <div class="form-group col">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div class="form-group col">
                    <label for="secondName">Second Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="secondName"
                      placeholder="Second Name"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="address"> Complete Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phoneNumber"> Phone Number </label>
                  <input
                    type="tel"
                    // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    class="form-control"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <select class="form-control" id="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <label>Expertise</label>
                <br />
                {Expertise.map((item) => {
                  return (
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id={item}
                        name={item}
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        {item}
                      </label>
                    </div>
                  );
                })}
                <br />

                <label for="inputGroupFile02">
                  {" "}
                  Upload ID verification documents
                </label>
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    name="profilePicture"
                    id="profilePicture"
                  />
                </div>
                <div>
                  <hr />
                  <h7>Please read and accept : </h7>
                  <Link href="#">
                    <a> Terms & Conditions</a>
                  </Link>
                </div>
                  <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="tnc" aria-describedby="tncFeedback" required/>
                  <label class="form-check-label" for="tnc">
                    Agree to terms and conditions
                  </label>
                  <div id="tncFeedback" class="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
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
