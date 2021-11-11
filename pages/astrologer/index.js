import withAuth from "../../auth/withAuth";
import { firebase, auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import router from "next/router";
import RegistrationForm from "../../components/RegistrationForm2";
import React, { Component } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import {testResultConverter,TestResult} from '../../dbObjects/TestResult'

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { astrologerConverter, Astrologer } from "../../dbObjects/Astrologer";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../dbObjects/AstrologerPrivateInfo";
import { QuestionConverter, Question } from '../../dbObjects/Question'

const storage = getStorage(firebase, "gs://testastrochrcha.appspot.com");
const db = getFirestore(firebase);

class Astrohome extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      registerStatus: false,
      astrologerProfileInfo: null,
      questions : [],
      numQues: 5,
    };
    this.registerformhandler = this.registerformhandler.bind(this);
    this.uploadDocToStorage = this.uploadDocToStorage.bind(this);
    this.getAstrologerInfo = this.getAstrologerInfo.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.evaluate_test = this.evaluate_test.bind(this);
  }
  uploadDocToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((snapshot) => {
    }).catch(e=>console.log(e));
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
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  async getQuestions() {
    const astros = query(collection(db, "question_set"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => { return new Question({id:doc.id,...doc.data()})});
    data = this.shuffle(data).slice(0,this.state.numQues);
    this.setState({questions:data});
  }

  componentDidMount() {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.replace("/signin");
      } else {
        this.getRegisterInfo(authUser);
        this.setState({ user: authUser });
        this.getAstrologerInfo(authUser.uid);
        this.getQuestions();
      }
    });
  }

  evaluate_test(test_result,e){
    this.state.questions.map(ques =>{ 
      test_result.response.push({...ques,answer: e.target[ques.id].value})
      test_result.score += ques.options[ques.correctOption] ==  e.target[ques.id].value ? 1: 0;
  });
    test_result.question_count = this.state.questions.length;
    return test_result;
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
      tnc: e.target.tnc.checked,
    };
    let privateInfo = {
      id: this.state.user.uid,
      verificationIdFront: "testing/ID_front" + profileData.id + ".png",
      verificationIdBack: "testing/ID_back" + profileData.id + ".png",
      pancardLink: "testing/pancard_" + profileData.id + ".png",
      pancardNumber: e.target.pancardNumber.value,
      phoneNumber: e.target.phoneNumber.value,
    };
    let test_result = new TestResult();
    test_result = this.evaluate_test(test_result,e);
    console.log(test_result)

    let profilePic = e.target.profilePicture.files[0];
    let verificationIdFront = e.target.verificationIdFront.files[0];
    let verificationIdBack = e.target.verificationIdBack.files[0];
    let pancardPic = e.target.pancard.files[0];
    this.uploadDocToStorage({ path: profileData.profilePic, file: profilePic });
    this.uploadDocToStorage({
      path: privateInfo.pancardLink,
      file: pancardPic,
    });
    this.uploadDocToStorage({
      path: privateInfo.verificationIdFront,
      file: verificationIdFront,
    });
    this.uploadDocToStorage({
      path: privateInfo.verificationIdBack,
      file: verificationIdBack,
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
    const testResultRef = doc(
      db,
      "astrologer",
      String(profileData.id),
      "test_result",
      profileData.id
    ).withConverter(testResultConverter);
    await setDoc(testResultRef,test_result);
    this.setState({
      registerStatus: false,
      astrologerProfileInfo: profileData,
    });
  }

  async getAstrologerInfo(pid) {
    const astros = collection(db, "astrologer");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerConverter)
    );
    if (querySnapshot.exists()) {
      this.setState({ astrologerProfileInfo: querySnapshot.data() });
    } else {
    }
  }

  render() {
    if (this.state.user) {
      if (this.state.registerStatus)
        return (
          <div>
            <RegistrationForm
              registerFormHandler={this.registerformhandler}
              questions={this.state.questions}
              user={this.state.user}
            />
          </div>
        );
      else if (this.state.astrologerProfileInfo) {
        return <RegistrationForm completed="true" />;
      } else return <div></div>;
    } else return <div>Loading</div>;
  }
}

export default withAuth(Astrohome);
