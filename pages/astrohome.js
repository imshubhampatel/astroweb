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
import {astrologerConverter,Astrologer} from '../dbObjects/Astrologer'
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
    console.log(storageRef.fullPath,"hey")
    uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!',snapshot);
  }
  );


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
    console.log(e.target.phoneNumber.value)
    console.log(e.target.firstName.value)
    console.log(e.target.secondName.value);
    console.log(e.target.address.value)
    console.log(e.target.gender.value);
    console.log(e.target.vedicAstrology.checked);
    console.log(e.target.tarotCardReading.checked);
    console.log(e.target.numerlogy.checked);
    console.log(e.target.matchMaking.checked);
    console.log(e.target.tnc.checked);

    let data = {
      id: this.state.user.uid,
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
    };
    
    console.log(data);
    let file = e.target.profilePicture.files[0]
    // this.uploadDocToStorage({ path: 'testing/arpit.png', file:file });
    //  setDoc(doc(db, "astrologer",user?.uid), data);
    // }
    const ref = doc(db, "testing", "","subcollection","lol").withConverter(astrologerConverter);
   await setDoc(ref, new Astrologer(data));
  }

    componentDidUpdate() {
    }
  render() {
  
    return (
      <div>
        {this.state.registerStatus ? (
          <RegistrationForm registerFormHandler={this.registerformhandler} user={this.state.user} />
        ) : null}
        
      </div>
    );
    
 

  }
}



export default withAuth(Astrohome);
