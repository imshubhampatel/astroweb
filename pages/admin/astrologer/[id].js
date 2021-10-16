import React,{useState,useEffect} from 'react'
import { useRouter } from "next/router";
import {
  collection,
  query,
    where,
    doc,
    getDoc,
    updateDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import {firebase} from '../../../config'
import AdminLayout from "../../../components/adminPanel/layout";
import {isAstrologer,setAstrologerPerm,removeAstrologerPerm} from '../../../auth/utils'
import useAdminAuth from '../../../auth/useAdminAuth'
import {astrologerConverter,Astrologer} from '../../../dbObjects/Astrologer'

const db = getFirestore(firebase);

const astrologer = useAdminAuth(() => {
    const router = useRouter();
    const { pid } = router.query;
    const [astro, setastro] = useState({});
    var [enabled, setenabled] = useState(true);
    
    async function getAllAstrologerInfo(pid) {
        const astros = collection(db, "astrologer");
        const querySnapshot = await getDoc(doc(astros,String(pid)).withConverter(astrologerConverter));
        if (querySnapshot.exists())
        {
            setastro(querySnapshot.data())
        }
        else {
            // console.log("no")
        }
    }
    async function toggleEnable(uid) {
        var response;
        if (!enabled)
        {
           response = await setAstrologerPerm(uid);
        }
        else {
           response = await removeAstrologerPerm(uid);
        }
        // console.log(response);
        setenabled(!enabled);
    }
    async function toggleVerify(uid) {
        const ref = doc(
              db,
              "astrologer",
              String(uid)
            ).withConverter(astrologerConverter);

         if (!astro.verified) {
             setastro({ ...astro, verified: true });   
            await updateDoc(ref, { ...astro, verified: true });
  
         } else {
           setastro({ ...astro, verified: false });
            await updateDoc(ref, { ...astro, verified: false });

         }
     }
    useEffect(() => {
        getAllAstrologerInfo(pid);
        if(pid)
        isAstrologer(pid).then((e) => {
            if (e)
                setenabled(true);
            else setenabled(false);
        })

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
                    <td> {astro.verified ? "Verified" : "Not Verified"}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <button
                  className={"btn btn-primary"}
                  onClick={() => toggleEnable(pid)}
                >
                  Enabled : {enabled ? "   On  " : "  off   "}
                            </button>
                            
                <button
                  className={"btn btn-primary"}
                  onClick={() => toggleVerify(pid)}
                >
                  Verified : {astro.verified ? "  Yes  " : "  Nope   "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          "no user"
        )}
      </div>
    );
})

astrologer.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default astrologer
