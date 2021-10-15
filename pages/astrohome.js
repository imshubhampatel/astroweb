import withAuth from "../auth/withAuth";
import { firebase, auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";
import RegistrationForm from '../components/RegistrationForm'
import React, { Component } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc
} from "firebase/firestore";
import { getStorage, ref ,uploadBytes} from "firebase/storage";
import { astrologerConverter, Astrologer } from '../dbObjects/Astrologer'
import {astrologerPrivateDataConverter,AstrologerPrivateData } from '../dbObjects/AstrologerPrivateInfo'

const storage = getStorage(
  firebase,
  "gs://astrochrchafirebase.appspot.com"
);
const db = getFirestore(firebase);

class Astrohome extends Component {
    constructor() {
      super()
      this.state = {
        user : null,
        registerStatus : true,
      };
      this.registerformhandler = this.registerformhandler.bind(this);
      this.uploadDocToStorage = this.uploadDocToStorage.bind(this);

    }
  uploadDocToStorage({path,file}) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {
  });
  }

  async getRegisterInfo(user) {
    const docRef = doc(db, "astrologer", user?.uid);
    const docSnap =  await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.setState({registerStatus: false})

    } else {
      this.setState({ registerStatus: true });
      console.log("No such document!");
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth,(authUser) => {
      if (!authUser) {
        router.push("/signin");
      }
      else {
        console.log(authUser.phoneNumber)
        this.getRegisterInfo(authUser);
        this.setState({ user: authUser });
      }
    });
  }

  async registerformhandler(e) {
    e.preventDefault();
    let profileData = {
      id: this.state.user.uid,
      firstName: e.target.firstName.value,
      secondName: e.target.secondName.value,
      email: e.target.email.value,
      gender : e.target.gender.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      profilePic: "testing/profile_" + this.state.user.uid + ".png",
      tnc : e.target.tnc.value,
      
    };
    let privateInfo = {
      id: this.state.user.uid,
      verificationId: "testing/aadhar_" + profileData.id + ".png",
      pancardLink: "testing/pancard_" + profileData.id + ".png",
      pancardNumber: e.target.pancardNumber.value,
      phoneNumber: e.target.phoneNumber.value,
    };
    
    console.log(profileData);
    let profilePic = e.target.profilePicture.files[0]
    let verificationIdPic = e.target.verificationId.files[0];
    let pancardPic = e.target.pancard.files[0];
    this.uploadDocToStorage({ path: profileData.profilePic, file:profilePic });
    this.uploadDocToStorage({ path: privateInfo.pancardLink, file: pancardPic });
    this.uploadDocToStorage({ path: privateInfo.verificationId, file: verificationIdPic });
    const ref = doc(db, "astrologer", String(profileData.id)).withConverter(astrologerConverter);
    await setDoc(ref, new Astrologer(profileData));
    const privateRef = doc(db, "astrologer", String(profileData.id),"privateInfo",profileData.id).withConverter(
       astrologerPrivateDataConverter
     );
    await setDoc(privateRef, new AstrologerPrivateData(privateInfo));
  }


  render() {
    if (this.state.user)
      return (
        <div>
          {this.state.registerStatus ? (
            <RegistrationForm registerFormHandler={this.registerformhandler} user={this.state.user} />
          ) : null}
        
        </div>
      );
    else
      return <div>Loading</div>;
    
 

  }
}



export default withAuth(Astrohome);
