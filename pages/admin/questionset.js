import styles from "../../styles/pages/admin/astrologermanagement.module.css";
import {v4 as uuidv4} from 'uuid';
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import { questionConverter, Question } from '../../dbObjects/Question'
import {uploadDocToStorage, getFile} from '../../utilities/utils'
import QuestionCard from '../../components/QuestionCard'
import {EmployeePermissions} from  '../../dbObjects/Employee'

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
        alert("Successfully Deleted");
    }
    async function addQues(Ques) {
        const astros = doc(db, "question_set" , Ques.id).withConverter(questionConverter);
        await setDoc(astros,new Question(Ques));
    }
    async function addQuestionHandler(e) {
      e.preventDefault();
      let uid = uuidv4();

      let response = {
        id: uid,
        question : e.target.question.value,
        options : {
          1: e.target.option1.value,
          2: e.target.option2.value,
          3: e.target.option3.value,
          4: e.target.option4.value,
        },
        type: "mcq",
        correctOption : e.target.correctOption.value,
        imgUrl : "question/question_" + uid + ".png"
      }
      addQues(new Question(response));
      uploadDocToStorage({path:response.imgUrl,file:e.target.img.files[0]});
      alert("Question Successfullu added!");
      setQuestions([...questions,new Question(response)])

    }
    function renderQuestions() {
    return <div className={`container d-flex gap-3 flex-column my-5`}>{questions.map(e =><QuestionCard key={e.id} data={e} deleteQues={deleteQues}></QuestionCard >)}</div>
    }
    return (
        <div className="container">
            <div className="row">
            <h3>Question Set</h3>
            <div>
              <h4> Add Question </h4>
              <form onSubmit={addQuestionHandler}>
              <div className="form-group">
                <label htmlFor="question">Question </label>
                <input className="form-control" id="question" type="text"></input>
              </div>

              <div className="form-group">
              <label htmlFor="img">Upload Question Image </label>
              <input className="form-control" id="img" type="file"></input>     
              </div>
              <div className="form-group">
                <label htmlFor="option1">option 1 </label>
                <input className="form-control" id="option1" type="text"></input>
              </div>
              <div className="form-group">
                <label htmlFor="option2">option 2 </label>
                <input className="form-control" id="option2" type="text"></input>
              </div>
              <div className="form-group">
                <label htmlFor="option3">option 3 </label>
                <input className="form-control" id="option3" type="text"></input>
              </div>
              <div className="form-group">
                <label htmlFor="option4">option 4 </label>
                <input className="form-control" id="option4" type="text"></input>
              </div>
              <div className="form-group">
                <label htmlFor="correctOption">Correct Option Number </label>
                <input className="form-control" id="correctOption" type="number" min={0} max={4}></input>
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
},EmployeePermissions.ASTRO_MANAGEMENT);
questionset.getLayout = function getLayout(page) {
    return <AdminLayout active_page="2">{page}</AdminLayout>;
  };
export default questionset
