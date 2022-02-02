import withAuth from "../../auth/withAuth";
import { firebase, auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import router from "next/router";
import RegistrationTest from "../../components/RegistrationTest";
import RegistrationForm from "../../components/RegistrationForm2";
import React, { Component } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { testResultConverter, TestResult } from "../../dbObjects/TestResult";
import { astrologerConverter, Astrologer } from "../../dbObjects/Astrologer";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../dbObjects/AstrologerPrivateInfo";
import { questionConverter, Question } from "../../dbObjects/Question";
import { uploadDocToStorage,getFile } from "../../utilities/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const db = getFirestore(firebase);

class Astrohome extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      registerStatus: false,
      testStatus: false,
      astrologerProfileInfo: {},
      questions: [],
      numQues: 5,
      formOptionData : {
        expertises : [],
        languages : []
      }
    };
    this.registerformhandler = this.registerformhandler.bind(this);
    this.getAstrologerInfo = this.getAstrologerInfo.bind(this);
    this.checkIfTestComplete = this.checkIfTestComplete.bind(this);
    this.submitTestHandler = this.submitTestHandler.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.evaluate_test = this.evaluate_test.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.getFormOptionsData = this.getFormOptionsData.bind(this);
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
  async getFormOptionsData() {
    const docRef = doc(db, "app_details/astro_reg");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.setState({ formOptionData: docSnap.data() });
    } else {
    }
  }
  async checkIfTestComplete(Id) {
    const docRef = doc(db, "astrologer", Id, "test_result", Id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.setState({ testStatus: true });
    } else {
      this.setState({ testStatus: false });
      this.getQuestions().then((ques) => this.setState({ questions: ques }));
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.replace("/signin");
      } else {
        this.getRegisterInfo(authUser);
        this.setState({ user: authUser });
        this.getAstrologerInfo(authUser.uid);
        this.checkIfTestComplete(authUser.uid);
        this.getFormOptionsData();
      }
    });
  }
  validateRegisterForm(e) {
    let data = {
      firstName: e.target.firstName.value,
      secondName: e.target.secondName.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      tnc: e.target.tnc.checked,
      profilePic: e.target.profilePicture.files.length,
      verificationIdFront: e.target.verificationIdFront.files.length,
      verificationIdBack: e.target.verificationIdBack.files.length,
      certification: e.target.certification.files.length,
      phoneNumber: e.target.phoneNumber.value,
    };
    if (
      data.firstName == "" ||
      data.secondName == "" ||
      data.email == "" ||
      data.gender == "" ||
      data.dob == "" ||
      data.address == "" ||
      data.phoneNumber == "" ||
      data.profilePic == 0 ||
      data.verificationIdBack == 0 ||
      data.verificationIdFront == 0 ||
      data.certification == 0 
    )
      return false;
    else return true;
  }
  async registerformhandler(e) {
    e.preventDefault();
    if (!this.validateRegisterForm(e)) {
      Toast.fire({
        icon: "error",
        title: "Please Complete Registration Form and fill correct details",
      });
      return;
    }

    let languageData = {}
    let expertiseData = {}

    this.state.formOptionData.expertises.map(exp => expertiseData[exp] = e.target[exp].checked)
    this.state.formOptionData.languages.map(lan => languageData[lan] = e.target[lan].checked)

    let profileData = {
      id: this.state.user.uid,
      firstName: e.target.firstName.value,
      secondName: e.target.secondName.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      dob: new Date(Date.parse(e.target.dob.value)),
      address: e.target.address.value,
      phoneNumber: e.target.phoneNumber.value,
      experience: Number(e.target.experience.value),
      dailyHours: Number(e.target.dailyHours.value),
      currentStatus : "Offline",
      expertise: expertiseData,
      languages: languageData,
      profilePic: "astrologer/" + this.state.user.uid + "/profilePic.png",
      profilePicLink:'',
      tnc: e.target.tnc.checked,
      enabled : false,
      workingwithother: e.target.work.value,
      status : {
        state : "unverified",
        remark : "None"
      }
    };
    let privateInfo = {
      id: this.state.user.uid,
      verificationIdFront: "astrologer/" + profileData.id + "/id_front.png",
      alternativePhoneNumber: e.target.alternativePhoneNumber.value,
      verificationIdBack: "astrologer/" + profileData.id + "/id_back.png",
      pancardLink: "",
      certificationUrl: "astrologer/" + profileData.id + "/certification.png",
      pancardNumber:"",
      phoneNumber: e.target.phoneNumber.value,
      walletBalance : 0,
      earnings : 0,
    };

    let profilePic = e.target.profilePicture.files[0];
    let verificationIdFront = e.target.verificationIdFront.files[0];
    let verificationIdBack = e.target.verificationIdBack.files[0];
    let certification = e.target.certification.files[0];

    uploadDocToStorage({
      path: privateInfo.certificationUrl,
      file: certification,
    });
    uploadDocToStorage({ path: profileData.profilePic, file: profilePic });
    profileData.profilePicLink = await getFile(profileData.profilePic);
    uploadDocToStorage({
      path: privateInfo.verificationIdFront,
      file: verificationIdFront,
    });
    uploadDocToStorage({
      path: privateInfo.verificationIdBack,
      file: verificationIdBack,
    });
    console.log(profileData,privateInfo)
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

  async submitTestHandler(e) {
    e.preventDefault();
    let test_result = new TestResult();
    test_result = this.evaluate_test(test_result, e);

    const testResultRef = doc(
      db,
      "astrologer",
      this.state.user?.uid,
      "test_result",
      this.state.user?.uid
    ).withConverter(testResultConverter);
    await setDoc(testResultRef, test_result);
    this.setState({
      testStatus: true,
    });
  }

  evaluate_test(test_result, e) {
    this.state.questions.map((ques) => {
      test_result.response.push({
        ...ques,
        answer: e.target[ques.id].value,
        explanation: e.target["exp_" + ques.id].value,
      });
      test_result.score +=
        ques.options[ques.correctOption] == e.target[ques.id].value ? 1 : 0;
    });
    test_result.questionCount = this.state.questions.length;

    return test_result;
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  async getQuestions() {
    const astros = query(collection(db, "question_set"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return new Question({ id: doc.id, ...doc.data() });
    });
    data = this.shuffle(data).slice(0, 5);
    return data;
  }

  render() {
    if (this.state.user) {
      if (this.state.registerStatus )
        return (
          <div>
            <RegistrationForm
              registerFormHandler={this.registerformhandler}
              questions={this.state.questions}
              data = {this.state.formOptionData}
              user={this.state.user}
            />
          </div>
        );
      else if( this.state.astrologerProfileInfo?.status?.state == "rejected")
      {
        return <>
          <RegistrationForm  
              registerFormHandler={this.registerformhandler}
              questions={this.state.questions}
              data = {this.state.formOptionData}
              user={this.state.user} 
              rejected={true}
              reason={this.state.astrologerProfileInfo.status.remark}
              
              />

        </>
      }
      else if (this.state.astrologerProfileInfo ) {
        return <RegistrationForm completed="true" />;
      }
      else return <div>Loading</div>;
    }
    else return <div>Loading</div>;

  }
}

export default withAuth(Astrohome);
