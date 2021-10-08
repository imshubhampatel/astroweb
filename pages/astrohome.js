import withAuth from "../auth/withAuth";
import { useUser } from "../auth/useUser";
import firebase from "../config";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import auth from '../config'
import RegistrationForm from '../components/RegistrationForm'
import React, { Component } from "react";
const db = firebase.firestore();

class Astrohome extends Component {
    constructor() {
      super()
      this.state = {
        user : null,
        registerStatus : true,
      };
    }
  getRegisterInfo(user) {

      db.collection("astrologer")
        .doc(user?.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log("USER exist");
            this.setState({registerStatus: false})
          } else {
            console.log("Need to register");
            this.setState({ registerStatus: true });
          }
        })
        .catch((e) => {
          console.log(e);
        });    
  }
  componentDidMount() {
    
    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/signin");
      }
      else {
        this.getRegisterInfo(authUser);
        this.setState({ user: authUser });
      }
    });
  }

  registerformhandler(e) {
      e.preventDefault();

      let data = {
        firstname: e.target.firstName.value,
      };
    
    console.log(data);
      db.collection("astrologer").
        doc(this.state.user?.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log("USER exist");
            console.log("astrologer");
          } else {
            console.log("USER does not exist" + this.state.user?.phoneNumber);
            // db.collection("securtiy_groups")
            //   .doc(this.state.user?.uid)
            //   .set({ uid: this.state.user.uid });
            // db.collection("security")
            console.log("USER created");
          }
        })
        .catch(() => {
          console.log("USER error exist");
        });
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
