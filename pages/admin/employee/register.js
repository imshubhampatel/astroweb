import AdminLayout from "../../../components/adminPanel/layout";
import useAdminAuth from "../../../auth/useAdminAuth";
import { firebase, auth } from "../../../config";
import { onAuthStateChanged } from "firebase/auth";
import EmployeeRegistrationForm from "../../../components/EmployeeRegistrationForm";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Employee, employeeConverter } from "../../../dbObjects/Employee";
const storage = getStorage(firebase, "gs://astrochrchafirebase.appspot.com");
const db = getFirestore(firebase);

import React from 'react'

const register = useAdminAuth(() => {
    

    async function uploadDocToStorage({ path, file }) {
        const storageRef = ref(storage, path);
        uploadBytes(storageRef, file).then((snapshot) => { });
    }


    async function registerformhandler(e) {
        e.preventDefault();
        let profileData = {
          id: this.state.user.uid,
          firstName: e.target.firstName.value,
          secondName: e.target.secondName.value,
          email: e.target.email.value,
          gender: e.target.gender.value,
          dob: e.target.dob.value,
          address: e.target.address.value,
          profilePic: "testing/profile_" + this.state.user.uid + ".png",
          verificationId: "testing/aadhar_" + profileData.id + ".png",
          pancardLink: "testing/pancard_" + profileData.id + ".png",
          pancardNumber: e.target.pancardNumber.value,
          phoneNumber: e.target.phoneNumber.value,
        };
       
        let profilePic = e.target.profilePicture.files[0];
        let verificationIdPic = e.target.verificationId.files[0];
        let pancardPic = e.target.pancard.files[0];
        this.uploadDocToStorage({ path: profileData.profilePic, file: profilePic });
        this.uploadDocToStorage({
            path: privateInfo.pancardLink,
            file: pancardPic,
        });
        
        this.uploadDocToStorage({
            path: privateInfo.verificationId,
            file: verificationIdPic,
        });
        const ref = doc(db, "employee", String(profileData.id)).withConverter(
            employeeConverter
        );
        await setDoc(ref, new Employee(profileData));
       
    }
 
     
    return (
      <div>
        <EmployeeRegistrationForm registerFormHandler={registerformhandler} />
      </div>
    );
});

register.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};

export default register;