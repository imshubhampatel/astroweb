import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/components/RegistrationForm2.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function RegistrationForm(props) {
  const user = props.user;
  const [localState,setLocalState] = useState({firstName:"",secondName:"",email:"",dob:"",address:"",gender:"",expertise:0,languages:0});
  const [date, setDate] = useState(getDate());
  const [formPage, setFormPage] = useState(1);
  const [expertisedropdown,setExpertisedropdown] = useState(true);
  const [languagesdropdown,setlanguagesdropdown] = useState(true);
  // console.log(user)

  const firetoast = (name) =>{
    Toast.fire({
      icon: "error",
      title: "Please fill "+name+" !",
    });
  }
  
  const langDropdownRef = useRef(); 
  const langDropdownButtonRef = useRef(); 
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!languagesdropdown && langDropdownRef.current && 
        
        !langDropdownButtonRef.current.contains(e.target) &&
        
        !langDropdownRef.current.contains(e.target)) {
        setlanguagesdropdown(true);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [languagesdropdown]);


  const expDropdownRef = useRef(); 
  const expDropdownButtonRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!expertisedropdown && expDropdownRef.current 
         && !expDropdownButtonRef.current.contains(e.target)
        && !expDropdownRef.current.contains(e.target)) {
        setExpertisedropdown(true);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [expertisedropdown]);


  const toggleFormPage = () => {
    if(formPage==1) {
      if (localState.firstName == "" )
       {
         firetoast("first name")
         return false;
       }
       else if( localState.secondName == "" )
       {
        firetoast("second name")
        return false;
      }
       else if (localState.email == "")
       {
        firetoast("email")
        return false;
      }
       else if(
        localState.gender == "")
        {
          firetoast("gender")
          return false;
        }
        else if(
          localState.dob == "" )
          {
            firetoast("dob")
            return false;
          }
        else if(localState.address == "")
          {
            firetoast("address")
            return false;
          }
          else if(localState.expertise == 0)
          {
            firetoast("Expertise")
            return false;
          }
          else if(localState.languages == 0)
          {
            firetoast("Languages")
            return false;
          }
    }

    setFormPage(formPage === 1 ? 2 : 1);
  };


  function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    // console.log(today);
    return today;
  }
  // Return Form Completion Page 
  if (props.completed === "true") {
    return (
      <div className={`${styles.baseContainer}`}>
        <div className="container-fluid bg-white">
          <div className={`row`}>
            <div className="col-sm" style={{background:"#FBE5AD"}}>
              <div className={`${styles.imageContainer}`} />
            </div>

            <div className="col-sm-8 my-4  ">
              <p className="mx-sm-auto text-sm-center">
                Thanks For filling out your details. We will verify your
                details and get back to you!                            
              </p>

              <div
                className={`${styles.endingBlueText} mx-auto text-center my-5 `}
              >
                Hope to see you onboard!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
 

  return (
    <div className={`${styles.baseContainer}`}>
      <div className="container-fluid bg-white">
        <div className={`row`}>
          <div className="col-sm" style={{background:"#FBE5AD"}}>
            <div className={`${styles.imageContainer}`} />
          </div>

          <div className="col-sm-8 my-4 my-sm-0 d-sm-flex flex-column justify-content-between">
            {/* Form Container  */}
            <div className={`container m-0 py-sm-3 ${styles.formContainer} `}>
              <h3 className={`${styles.mainHeading}`}>
                Astrologer Registration Form
              </h3>

              <form className={`row g-3 needs-validation`} onSubmit={props.registerFormHandler}>
                {/* Form Part one  */}
                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="firstName" className="form-label">
                    First Name <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={(e)=>setLocalState({...localState,firstName:e.target.value})}
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="secondName"
                    onChange={(e)=>setLocalState({...localState,secondName:e.target.value})}

                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="email" className="form-label">
                    Email <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    nam="email"
                    onChange={(e)=>setLocalState({...localState,email:e.target.value})}
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="date" className="form-label">
                    Date of Birth  <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="dob"
                    max={date}
                    onChange={(e)=>setLocalState({...localState,dob:e.target.value})}
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="address" className="form-label">
                    Current Address <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={(e)=>setLocalState({...localState,address:e.target.value})}
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="phone" className="form-label">
                    Your main Phone Number <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phoneNumber"
                    defaultValue={user.phoneNumber}
                    readOnly={user.phoneNumber ? true:false}
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label
                    htmlFor="alternativePhoneNumber"
                    className="form-label"
                  >
                    Alternate Phone Number 
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="alternativePhoneNumber"
                    name="alternativePhoneNumber"
                    
                  />
                </div>
                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                 <div style={{position:"relative"}} >
                    <button  ref={expDropdownButtonRef} className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown" onClick={()=>setExpertisedropdown((e) => !e)}>Choose Expertise
                    <span className="caret"></span></button>
                    <div ref={expDropdownRef}  style={expertisedropdown ? { display: "none"} : {}} className={`${styles.listDropdownContainer} form-check shadow `}> 
                    <ul style={{listStyle: "none"}} >
                      {props.data.expertises.map(e => <li key={e} ><input type="checkbox" onChange={e=>{
                        let val = e.target.checked==true ? 1 : -1;
                        val = localState.expertise + val;
                        setLocalState({...localState,expertise:val}); }} className="form-check-input" id={e} /> <label className="form-check-label" htmlFor={e}> {e} </label> </li> )}
                    </ul>
                    </div>
                  </div>
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                 <div style={{position:"relative"}} >
                    <button ref={langDropdownButtonRef} className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown" onClick={()=>setlanguagesdropdown(!languagesdropdown)}>Choose languages
                    <span className="caret"/>
                    </button>
                    <div ref={langDropdownRef}  style={languagesdropdown ? { display: "none"} : {}} className={`${styles.listDropdownContainer} form-check shadow `}> 
                    <ul style={{listStyle: "none"}} >
                      {props.data.languages.map(e => <li key={e}><input type="checkbox" onChange={e=>{
                        let val = e.target.checked==true ? 1 : -1;
                        val = localState.languages + val;
                        setLocalState({...localState,languages:val}); }} className="form-check-input" id={e} />   <label className="form-check-label" htmlFor={e}> {e} </label>   </li> )}
                    </ul>

                    </div> 
                    
                  </div>
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <div>
                    <label className="form-label" htmlFor="maleOption">
                      Gender <span style={{color:"red"}}>*</span>
                    </label>
                  </div>
                  <div className={`d-flex justify-content-between flex-wrap`}>
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="male"
                      id="maleOption"
                      autoComplete="off"
                      onChange={(e)=>setLocalState({...localState,gender:e.target.value})}

                    />
                    <label
                      className="btn btn-outline-warning"
                      htmlFor="maleOption"
                    >
                      Male
                    </label> 

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="female"
                      id="femaleOption"
                      autoComplete="off"
                      onChange={(e)=>setLocalState({...localState,gender:e.target.value})}

                    />
                    <label
                      className={`btn btn-outline-warning `}
                      htmlFor="femaleOption"
                    >
                      Female
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="other"
                      id="other"
                      autoComplete="off"
                      onChange={(e)=>setLocalState({...localState,gender:e.target.value})}
                    />
                    <label
                      className={`btn btn-outline-warning `}
                      htmlFor="other"
                    >
                      Other
                    </label>
                  </div>
                </div>

                {/* Form Part Two  */}

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6 `}
                >
                  <label htmlFor="verificationIdFront" className="form-label">
                    (Aadhar/DL) Front <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="verificationIdFront"
                    name="verificationIdFront"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6 `}
                >
                  <label htmlFor="verificationIdBack" className="form-label">
                    (Aadhar/DL) Back <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="verificationIdBack"
                    name="verificationIdBack"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="profilePicture" className="form-label">
                    Recent Profile Picture <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePicture"
                    name="profilePicture"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancard" className="form-label">
                    PAN Card <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="pancard"
                    name="pancard"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancardNumber" className="form-label">
                    PAN Card Number <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pancardNumber"
                    name="pancardNumber"
                    pattern="^[ ]*[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[ ]*$"
                    required
                  />
                </div>
                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="certification" className="form-label">
                   Astrology Degree and Certification (in PDF format Only) <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="certification"
                    name="certification"
                    required
                  />
                </div>
                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="work" className="form-label">
                    Are you working with any other similar platform ?
                  </label>
                  <select id="work" className="form-select" aria-label="Default select example">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-4`}
                >
                  <label htmlFor="experience" className="form-label">
                    Experience (in years) <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="experience"
                    name="experience"
                    required
                  />
                </div>
                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-8`}
                >
                  <label htmlFor="dailyHours" className="form-label">
                    How many hours you can contribute daily ? <span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="dailyHours"
                    name="dailyHours"
                    max={24}
                    min={0}
                    required
                  />
                </div>
          

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="tnc"
                      aria-describedby="tncFeedback"
                      required
                    />
                    <label className="form-check-label" htmlFor="tnc">
                      Agree to <Link href="/astrologer/termsncondition"><a>Terms and conditions</a></Link>
                    </label>
                    <div id="tnc" className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-xs-12 `}
                >
                  <div className="float-end mt-5">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      id="submitButton"
                      name="submitButton"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom button container  */}
            <div
              className={`${styles.formContainer} mt-4 mt-sm-0 mb-sm-4 px-4`}
            >
              <div className={`d-flex `}>
                <button
                  onClick={() => toggleFormPage()}
                  className={`btn btn-warning ms-auto`}
                >
                  {formPage === 1 ? "Next" : "Back"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
