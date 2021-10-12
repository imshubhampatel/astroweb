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
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={user?.email}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group col">
                    <label for="secondName">Second Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="secondName"
                      placeholder="Second Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="address"> Complete Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="phoneNumber"> Phone Number </label>
                  <input
                    type="tel"
                    // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    className="form-control"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="gender">Gender</label>
                  <select className="form-control" id="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <label>Expertise</label>
                <br />
                {Expertise.map((item) => {
                  return (
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item}
                        name={item}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
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
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
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
                  <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="tnc" aria-describedby="tncFeedback" required/>
                  <label className="form-check-label" for="tnc">
                    Agree to terms and conditions
                  </label>
                  <div id="tncFeedback" className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
                <button type="submit" className="btn btn-primary">
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
