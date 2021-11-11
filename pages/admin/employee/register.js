import AdminLayout from "../../../components/adminPanel/layout";
import withAdminAuth from "../../../auth/withAdminAuth";
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
  setDoc,
  doc,
} from "firebase/firestore";
import {setSubadminPerm} from "../../../auth/utils";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Employee, employeeConverter } from "../../../dbObjects/Employee";
import { data } from "autoprefixer";

const storage = getStorage(firebase, "gs://astrochrchafirebase.appspot.com");
const db = getFirestore(firebase);
const auth = getAuth(adminfirebase);


const register = withAdminAuth(() => {
  const [message, setmessage] = useState("")
    
  async function uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => { });
  }
  async function createEmployee(data) {
    const { uid, e } = data;
    let profileData = {
      id: uid,
      firstName: e.target.firstName.value,
      secondName: e.target.secondName.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      dob: Date(e.target.dob.value),
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
    await uploadDocToStorage({
      path: profileData.profilePic,
      file: profilePic,
    });
    await uploadDocToStorage({
      path: profileData.pancardLink,
      file: pancardPic,
    });

    await uploadDocToStorage({
      path: profileData.verificationId,
      file: verificationIdPic,
    });
    const ref = doc(db, "employee", String(profileData.id)).withConverter(
      employeeConverter
    );
    await setDoc(ref, new Employee(profileData));
    setSubadminPerm(uid);
    alert("Employee Created");
  };

  async function registerformhandler(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, e.target.email.value, "Windows8").then((user) => {
      createEmployee({uid:user.user.uid,e: e});
      signOut(auth);
    }).catch((error) => {
      alert(error.message)
    });
  };
 
     
  return (
    <div>
      <EmployeeRegistrationForm registerFormHandler={registerformhandler} />
    </div>
  );
});



register.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};

export default register;
