import React from 'react'
import firebase from '../config';
import Completeprofile from  '../components/completeprofile';
import db from '../config'

const clickme = async () => {
  await db.collection("users")
    .doc("UID").set({
      first: "Ada",
      last: "Lovelace",
      born: 1815,
      role: "Admin"
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    db.collection("astrologer")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().email}`);
    });
  });
};
  
function testdb() {
  //  const [FirstName, setFirstName] = useState("arpit")
  //   const [Expertise, setExpertise] = useState("grape");
  //   const [Experience, setExperience] = useState();
  //   const [Address, setAddress] = useState();
  //   const [SecondName, setSecondName] = useState();

  //   const handleSubmit = () => {

  //   }

    
    return (
      <div>
        {/* <button onClick={() =>clickme()}>click</button> */}
        <React.Fragment>
          <Completeprofile></Completeprofile>
        </React.Fragment>
      </div>
    );
}

export default testdb
