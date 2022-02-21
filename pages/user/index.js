import UserRegistrationForm from "../../components/userRegisterForm";
import withAuth from "../../auth/withAuth";
import React, { useState, useEffect } from "react";
import {isCurrentUser , getCurrentAstrologer} from '../../auth/utils'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "next/router";
import { User,UserConverter} from '../../dbObjects/User'
import { doc , getFirestore, setDoc} from "firebase/firestore";
import { adminfirebase,auth_2  } from '../../AdminConfig'

const db = getFirestore(adminfirebase);

function Index() {
  const [isRegistered,setIsRegistered] = useState(null);
  const [isAstrologer,setIsAstrologer] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(()=>{
    onAuthStateChanged(auth_2,(user)=>{
      if(user) {
        if(user.email == null) {
          alert("Invalid User");
          router.replace("/astrologer")
          return;
        }
        
        isCurrentUser(user.uid).then((res)=>{
          
          if(res!=null) {
            setIsRegistered(true);
            setUserProfile(res);
          }
          else {
            setIsRegistered(false);
            setUserProfile(user);
          }}
          )
          getCurrentAstrologer(user.uid).then(res=> setIsAstrologer(res));
      }
      else router.replace("/")

      console.log("yes")
    })
  },[]);



  async function registerformhandler(e) {
    e.preventDefault();
     let profileData = {
      uid: userProfile.uid,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      dob: new Date(Date.parse(e.target.dob.value)),
      phoneNumber: e.target.phoneNumber.value,
      placeOfBirth : e.target.placeOfBirth.value,
    };
    const ref = doc(db, "user", String(profileData.uid)).withConverter(
      UserConverter
    );
    await setDoc(ref, new User(profileData));
    setIsRegistered(true);
  }

  if(isRegistered == null)
  return <div>Loading ...</div>
  else 

  return <UserRegistrationForm userProfile={userProfile} isRegistered={isRegistered} isAstrologer={isAstrologer} registerFormHandler={registerformhandler}></UserRegistrationForm>
}

export default withAuth(Index,"user");