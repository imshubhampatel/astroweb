import AdminLayout from "../../../components/adminPanel/layout";
import useAdminAuth from "../../../auth/useAdminAuth";
import { adminfirebase } from "../../../AdminConfig";
import { firebase } from '../../../config'
import {useState} from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut

} from "firebase/auth";
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
const auth = getAuth(adminfirebase);


const register = useAdminAuth(() => {
    
    async function uploadDocToStorage({ path, file }) {
        const storageRef = ref(storage, path);
        uploadBytes(storageRef, file).then((snapshot) => { });
    }
  async function createEmployee(uid, e) {
     let profileData = {
       id: uid,
       firstName: e.target.firstName.value,
       secondName: e.target.secondName.value,
       email: e.target.email.value,
       gender: e.target.gender.value,
       dob: e.target.dob.value,
       address: e.target.address.value,
       profilePic: "testing/profile_" + uid + ".png",
       verificationId: "testing/aadhar_" + uid + ".png",
       pancardLink: "testing/pancard_" + uid + ".png",
       pancardNumber: e.target.pancardNumber.value,
       phoneNumber: e.target.phoneNumber.value,
     };

     let profilePic = e.target.profilePicture.files[0];
     let verificationIdPic = e.target.verificationId.files[0];
     let pancardPic = e.target.pancard.files[0];
     uploadDocToStorage({
       path: profileData.profilePic,
       file: profilePic,
     });
     uploadDocToStorage({
       path: profileData.pancardLink,
       file: pancardPic,
     });

     uploadDocToStorage({
       path: profileData.verificationId,
       file: verificationIdPic,
     });
     const ref = doc(db, "employee", String(profileData.id)).withConverter(
       employeeConverter
     );
    await setDoc(ref, new Employee(profileData));
    console.log("Done ");

  }


    async function registerformhandler(e) {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, e.target.email.value, "Windows8").then((user) => {
        console.log(user.user.uid);
        createEmployee(user.user.uid, e);
        signOut(auth);
        
      }
      );
       
       
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