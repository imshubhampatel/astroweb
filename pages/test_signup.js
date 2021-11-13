import RegistrationForm from "../components/RegistrationForm2";
import RegistrationTest from "../components/RegistrationTest";
import Head from "next/head";
import { questionConverter, Question } from "../dbObjects/Question";
import React, { useState, useEffect } from 'react';
import { firebase, auth } from "../config";

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
const db = getFirestore(firebase);

export default function Page() {

  const [ques, setQues] = useState([]);


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  async function getQuestions() {
    const astros = query(collection(db, "question_set"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return new Question({ id: doc.id, ...doc.data() });
    });
    data = shuffle(data).slice(0, 5);
    return data;
  }

  useEffect(async () => {
    const questions = await getQuestions();
    setQues(questions);
  }, []);

  

  

  return <RegistrationTest questions={ques} />;
}

Page.getLayout = (page) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {page}
    </>
  );
};
