import React,{useState,useEffect} from 'react'
import { useRouter } from "next/router";
import {
  collection,
  query,
    where,
  doc,
    getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import {firebase} from '../../../config'

const db = getFirestore(firebase);

function astrologer() {
    const router = useRouter();
    const { pid } = router.query;
    const [astro, setastro] = useState({});
    
    async function getAllAstrologerInfo(pid) {
        const astros = collection(db, "astrologer");
        const querySnapshot = await getDoc(doc(astros,String(pid)));
        if (querySnapshot.exists())
        {
            setastro(querySnapshot.data())
        }
        else {
            console.log("no")
        }

  }
    useEffect(() => {
       console.log(pid);
        getAllAstrologerInfo(pid).then(() => {
        console.log("here")
    });
  }, [pid]);

    return (
      <div>
        {astro ? (
          <div className="container">
            <div className="row">
              <table>
                <tbody>
                  <tr>
                    <td> {astro.firstName + " " + astro.secondName}</td>
                    <td> {astro.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td> {astro.email}</td>
                    <td> {astro.verified}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          "no user"
        )}
      </div>
    );
}

export default astrologer
