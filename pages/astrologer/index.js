import withAuth from "../../auth/withAuth";
import { firebase, auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import RegistrationForm from "../../components/RegistrationForm";
import router from "next/router";
import RegistrationForm2 from "../../components/RegistrationForm2";

import React, { Component } from "react";
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
import { astrologerConverter, Astrologer } from "../../dbObjects/Astrologer";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../dbObjects/AstrologerPrivateInfo";

const storage = getStorage(firebase, "gs://astrochrchafirebase.appspot.com");
const db = getFirestore(firebase);

class Astrohome extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      registerStatus: false,
      astrologerProfileInfo: null,
    };
    this.registerformhandler = this.registerformhandler.bind(this);
    this.uploadDocToStorage = this.uploadDocToStorage.bind(this);
    this.getAstrologerInfo = this.getAstrologerInfo.bind(this);
  }
  uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {});
  }

  async getRegisterInfo(user) {
    const docRef = doc(db, "astrologer", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.setState({ registerStatus: false });
    } else {
      this.setState({ registerStatus: true });
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push("/signin");
      } else {
        // console.log(authUser.phoneNumber)
        this.getRegisterInfo(authUser);
        this.setState({ user: authUser });
        this.getAstrologerInfo(authUser.uid);
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
      gender: e.target.gender.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      profilePic: "testing/profile_" + this.state.user.uid + ".png",
      tnc: e.target.tnc.value,
    };
    let privateInfo = {
      id: this.state.user.uid,
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
    const ref = doc(db, "astrologer", String(profileData.id)).withConverter(
      astrologerConverter
    );
    await setDoc(ref, new Astrologer(profileData));
    const privateRef = doc(
      db,
      "astrologer",
      String(profileData.id),
      "privateInfo",
      profileData.id
    ).withConverter(astrologerPrivateDataConverter);
    await setDoc(privateRef, new AstrologerPrivateData(privateInfo));
    this.setState({ registerStatus: false });
  }
  async getAstrologerInfo(pid) {
    const astros = collection(db, "astrologer");

    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerConverter)
    );
    if (querySnapshot.exists()) {
      this.setState({ astrologerProfileInfo: querySnapshot.data() });
    } else {
      console.log("no");
    }
  }

  render() {
    if (this.state.user) {
      if (this.state.registerStatus)
        return (
          <div>
            <RegistrationForm
              registerFormHandler={this.registerformhandler}
              user={this.state.user}
            />
          </div>
        );
      else if (this.state.astrologerProfileInfo) {
        return (
          <div>
            htmlFor more Information Login to our APP
            <br />
            <div>
              Name : {this.state.astrologerProfileInfo.firstName} <br />
              Email : {this.state.astrologerProfileInfo.email}
            </div>
            <div>
              <form>
                <input></input>
                <input></input>
              </form>
            </div>
          </div>
        );
      } else return <div></div>;
    } else return <div>Loading</div>;
  }
}


export default withAuth(Astrohome);
