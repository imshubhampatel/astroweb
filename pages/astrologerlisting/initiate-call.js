import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import { adminfirebase } from "../../AdminConfig";
import { initiateCall } from "../../utilities/astrologer/InitiateCall";
export default function InitiateCall() {
  // admin and auth and top of variables
  const auth = getAuth(firebase);
  const adminAuth = getAuth(adminfirebase);
  const router = useRouter();
  let id = router.query.id;

  // useState ?
  const [astrologer, setAstrologer] = useState("");
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    placeOfBirth: "",
    timeOfBirth: "",
    dateOfBirth: "",
    query: "",
    customerNumber: "",
    language: "",
    astrologerUid: "",
    userUid: "",
    language: "",
  });

  // useEffect ??

  // useState for getting the astrolger data from server  ?
  useEffect(() => {
    if (!id) return;
    getAstrologer(id);
  }, [id]);

  // useEffect for user authentication and uid

  useEffect(() => {
    console.log("called");
    onAuthStateChanged(adminAuth, (Authuser) => {
      if (Authuser) {
        setUser(Authuser);
        console.log("user", Authuser.uid);
      } else {
        onAuthStateChanged(auth, (User) => {
          console.log("User", User);
          router.push({
            pathname: "/signin",
          });
        });
      }
    });
  }, []);

  // useEffect for logging changes in state ?
  useEffect(() => {
    console.table(userDetails);
  }, [userDetails]);

  // useEffect for logging changes in state ?
  useEffect(() => {
    if (!user) return;
    setUserDetails({ ...userDetails, userUid: user.uid });
  }, [user]);

  // useEffect for setting astrolger uid
  useEffect(() => {
    if (!astrologer) return;
    setUserDetails({ ...userDetails, astrologerUid: astrologer?.id });
  }, [astrologer]);

  // functions ?

  async function getAstrologer(uid) {
    let db = getFirestore(firebase);
    const astros = query(collection(db, "astrologer"), where("id", "==", uid));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(data);
    setAstrologer(data[0]);
  }

  let redirectHandler = () => {};

  const onChangeInput = (name) => (e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log("submitted");
    try {
      let result = await initiateCall(userDetails);
      console.log("result", result);
    } catch (error) {
      console.log(error.response.data || error.response || error);
    }
  }

  return (
    <div className="main_calling_div">
      <div className="parentDivCalling">
        <div className="astrologer_info">
          <div className="astrologersImage">
            <img src={astrologer?.profilePicLink} />
          </div>
          <div className="astrologersContent"></div>
        </div>
        <div className="user_info">
          <h3>Please fill the Details</h3>
          <form>
            <div>
              <label htmlFor="first-name">First name</label>
              <input
                required
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={userDetails.firstName}
                onChange={onChangeInput("firstName")}
              />
            </div>

            <div>
              <label htmlFor="last-name">Last name</label>
              <input
                required
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={userDetails.lastName}
                onChange={onChangeInput("lastName")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Contact Number</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.customerNumber}
                onChange={onChangeInput("customerNumber")}
                className="text-input"
              />
            </div>

            <div>
              <label htmlFor="email-address">Date of Birth</label>
              <input
                required
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                value={userDetails.dateOfBirth}
                onChange={onChangeInput("dateOfBirth")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Place Of Birth</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.placeOfBirth}
                onChange={onChangeInput("placeOfBirth")}
              />
            </div>
            <div>
              <label htmlFor="email-address">Time of Birth</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.timeOfBirth}
                onChange={onChangeInput("timeOfBirth")}
              />
            </div>
            <div>
              <label htmlFor="email-address">Language</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.language}
                onChange={onChangeInput("language")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Enter your Query</label>
              <textarea
                required
                value={userDetails.query}
                onChange={onChangeInput("query")}
              />
            </div>
          </form>
          <button type="submit" onClick={(e) => onSubmitHandler(e)}>
            Call now
          </button>
        </div>
      </div>
    </div>
  );
}
