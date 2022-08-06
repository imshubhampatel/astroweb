import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
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
export default function InitiateCall() {
  const [astrologer, setAstrologer] = useState("");

  let db = getFirestore(firebase);
  const router = useRouter();
  let id = router.query.id;

  useEffect(() => {
    getAstrologer(id);
  }, [id]);

  async function getAstrologer(uid) {
    const astros = query(collection(db, "astrologer"), where("id", "==", uid));
    const querySnapshot = await getDocs(astros);
    console.log(querySnapshot.docs);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(data);
    setAstrologer(data[0]);
  }

  const [userDetails, SetuserDetails] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    profile_pic: "",
    formData: "",
  });

  let redirectHandler = () => {};

  const onChangeInput = (name) => (e) => {};

  async function onSubmitHandler(e) {}

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
          <form onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="first-name">First name</label>
              <input
                required
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={userDetails.first_Name}
                onChange={onChangeInput("first_name")}
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
                value={userDetails.last_name}
                onChange={onChangeInput("last_name")}
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
                value={userDetails.username}
                onChange={onChangeInput("username")}
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
                value={userDetails.email}
                onChange={onChangeInput("email")}
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
                value={userDetails.company_name}
                onChange={onChangeInput("company_name")}
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
                value={userDetails.company_name}
                onChange={onChangeInput("company_name")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Enter your Query</label>
              <textarea
                required
                value={userDetails.password}
                onChange={onChangeInput("password")}
              />
            </div>
          </form>
          <button type="submit">Call now</button>
        </div>
      </div>
    </div>
  );
}
