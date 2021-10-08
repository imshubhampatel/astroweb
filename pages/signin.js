import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../config";
import "firebase/auth";
import { setUserCookie } from "../auth/userCookie";
import { mapUserData } from "../auth/useUser";
import styles from "../styles/Home.module.css";

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
  signInFlow: "popup",
  signInOptions: [
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   requireDisplayName: false,
    // },
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl,
  credentialHelper: "none",
  callbacks: {
    // Optional Can be removed
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    },
  },
});

const FirebaseAuth = () => {
  const signInSuccessUrl = "/astrohome";
  return (
    <div className={styles.container}>
      <h2>Sign/Register</h2>
      <div>
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
          firebaseAuth={firebase.auth()}
          signInSuccessUrl={signInSuccessUrl}
        />
      </div>
    </div>
  );
};

export default FirebaseAuth;
