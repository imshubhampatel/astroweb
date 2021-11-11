import styles from "../../styles/pages/admin/astrologermanagement.module.css";

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../config";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import { QuestionConverter, Question } from '../../dbObjects/Question'


const db = getFirestore(firebase);

const questionset = withAdminAuth(()=> {
    const [questions,setQuestions] = useState([]);

    useEffect(()=>{
        getAllQuestions()
    },[]);

    async function getAllQuestions() {
        const astros = query(collection(db, "question_set"));
        const querySnapshot = await getDocs(astros);
        let data = querySnapshot.docs.map((doc) => { return new Question({id:doc.id,...doc.data()})});
        setQuestions(data);
    }
    async function deleteQues(QuesId) {
        const question = doc(db, "question_set/"+String(QuesId));
        await deleteDoc(question);
    }
    async function addQues(Ques) {
        const astros = query(collection(db, "question_set")).withConverter(QuestionConverter);
        await addDoc(astros,Ques);
    }
    function renderQuestions() {

    return questions.map(e =>{ 
    return <div> Question : {e.question} <br/> Options : <br/>
    <ul>
    {Object.values(e.options).map((val) => <li value={val}>{val}</li>)}
    </ul>
    <button className="btn btn-danger" onClick={() => deleteQues(e.id)}> Delete</button>
    </div>})
    }
    return (
        <div className="container">
            <h3>Question Set</h3>
            <div className="row">
            <div>
              <h4> Add Question </h4>
              <form>
              <div className="form-group">
                <label htmlFor="question">Question </label>
                <input className="form-control" id="question" type="text"></input>
              </div>
              <div className="form-group">
                  <select id="type">
                      <option value="mcq">
                        Text Mcq
                      </option>
                      <option value="imgMcq">
                        Image Mcq
                      </option>
                  </select>   
              </div>
              <div className="form-group">
                 
              </div>

                  <button className="btn btn-primary"type="submit"> Submit Button</button>
              </form>
              </div>
            </div>
            <div className="row">
                <h4>All Questions</h4>
                <div>
                {renderQuestions()}
                </div>
            </div>

        </div>
    )
});
questionset.getLayout = function getLayout(page) {
    return <AdminLayout active_page="2">{page}</AdminLayout>;
  };
export default questionset
