import React, { useState, useEffect } from "react";
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
import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import {
  isSubAdmin,
  setSubadminPerm,
  removeSubadminPerm,
} from "../../../auth/utils";
import useAdminAuth from "../../../auth/useAdminAuth";
import { employeeConverter, Employee } from "../../../dbObjects/Employee";


const db = getFirestore(firebase);

const employee = useAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  var [enabled, setenabled] = useState(true);

  async function getemployeeInfo(pid) {
    const astros = collection(db, "employee");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(employeeConverter)
    );
    if (querySnapshot.exists()) {
      setastro(querySnapshot.data());
    } else {
      // console.log("no")
    }
  }
  async function toggleEnable(uid) {
    var response;
    if (!enabled) {
      response = await setSubadminPerm(uid);
    } else {
      response = await removeSubadminPerm(uid);
    }
    // console.log(response);
    setenabled(!enabled);
  }

  useEffect(() => {
    getemployeeInfo(pid);
    if (pid)
      isSubAdmin(pid).then((e) => {
        if (e) setenabled(true);
        else setenabled(false);
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

             
            </div>
          </div>
        </div>
      ) : (
        "no user"
      )}
    </div>
  );
});

employee.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default employee;
