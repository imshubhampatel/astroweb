import React from "react";
import { useState, useReducer } from "react";
import styles from "../styles/components/astrologerlisting/astrologer.module.css";

function CallingForm(props) {
  let styles = props.cssmodule;
  const { closeForm } = props;
  const [contactValues, setContactValues] = useState({
    userName: "",
    contactNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    query: "",
  });

  const handleChange = (e) => (name) => {
    setContactValues({ ...contactValues, [name]: e.target.value });
    console.log(e.target, name);
  };
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className={styles.transparentDiv}>
        <div className={styles.callForm}>
          <form onSubmit={submitHandler}>
            <fieldset>
              <div className="form-group my-2 ">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={handleChange("userName")}
                />
              </div>
              <div className="form-group my-2 ">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={handleChange("userName")}
                />
              </div>
              <div className="form-group my-2 ">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={handleChange("userName")}
                />
              </div>
              <label>Contact Number</label>
              <br />
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={handleChange("contactNumber")}
              />
            </fieldset>
            <div className={styles.callbutton}>
              <button
                className={`${styles.callFromButton} btn`}
                type="submit"
                // disabled={submitting}
                onClick={() => closeForm()}
              >
                Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CallingForm;
