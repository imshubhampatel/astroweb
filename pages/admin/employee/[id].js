import layoutStyles from "../../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../../styles/pages/admin/employee/[id].module.css";
import FireImage from "../../../components/FireImage";
import {RiToggleFill, RiToggleLine} from "react-icons/ri"
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
import withAdminAuth from "../../../auth/withAdminAuth";
import { employeeConverter, Employee } from "../../../dbObjects/Employee";
import Image from "next/image";
const db = getFirestore(firebase);

// const employee = withAdminAuth(() => {

const employee = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  var [enabled, setenabled] = useState(true);
  const [edit, setedit] = useState(false);

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

  async function permissionChangeHandler(e) {
    e.preventDefault();
    const emp = {
      ...astro,
      permissions: {
        astro_management: e.target.astro_management
          ? e.target.astro_management.checked
          : false,
        emp_management: e.target.emp_management
          ? e.target.emp_management.checked
          : false,
        wallet_management: e.target.wallet_management
          ? e.target.wallet_management.checked
          : false,
        user_management: e.target.user_management
          ? e.target.user_management.checked
          : false,
        broadcast_management: e.target.broadcast_management
          ? e.target.broadcast_management.checked
          : false,
        store: e.target.store ? e.target.store.checked : false,
      },
    };

    const ref = doc(db, "employee", String(pid)).withConverter(
      employeeConverter
    );
    setDoc(ref, new Employee(emp)).then(() => {
      alert("Permissions Updated");
    });
    setastro(emp);
  }

  console.log(astro);

  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>
          Employee Management System
        </h2>

        <div className={`${styles.mainInfoContainer}`}>
          <div className={`${styles.empPhoto}`}>
            {astro.profilePic ? (
              <FireImage
                src={astro.profilePic}
                alt="Profile Picture"
                layout="fill"
              />
            ) : (
              ""
            )}
          </div>



          <div className={`${styles.empInfo}`}>
           <h4>Astrologer Mahesh</h4>

           <div className={`d-flex gap-1 flex-column`}>
              <div className={``}>
                Hyderabad, India
              </div>

              <div className={``}>+91 9877263549</div>

              <div className={``}>mahesh@gmail.com</div>
            </div>


          </div>

          <div>

            Enabled <RiToggleFill fill="green" rotate="90"/>  <RiToggleLine fill="red" />
          </div>



        </div>
      </div>
    </div>
  );
};

// );

employee.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};
export default employee;

// <div>
// {astro ? (
//   <div className="container">
//     <div className="row">
//       <table>
//         <tbody>
//           <tr>
//             <td> {astro.firstName + " " + astro.secondName}</td>
//             <td> {astro.phoneNumber}</td>
//           </tr>
//           <tr>
//             <td> {astro.email}</td>
//             <td> {astro.verified ? "Verified" : "Not Verified"}</td>
//           </tr>
//         </tbody>
//       </table>
//       <div>
//         <button
//           className={"btn btn-primary"}
//           onClick={() => toggleEnable(pid)}
//         >
//           Enabled : {enabled ? "   On  " : "  off   "}
//         </button>
//         <button
//           onClick={() => {
//             setedit(!edit);
//           }}
//           className={"btn btn-primary"}
//         >
//           Edit Profile
//         </button>
//       </div>
//       <div>
//         <h4>Permissions</h4>

//         <div>
//           <form onSubmit={permissionChangeHandler}>
//             {astro.permissions
//               ? Object.keys(astro.permissions).map((key) => (
//                   <div className="form-check" key={key}>
//                     <label className="form-check-label" htmlFor={key}>
//                       {key}
//                     </label>
//                     <input
//                       className="form-check-input"
//                       name={key}
//                       id={key}
//                       type="checkbox"
//                       defaultChecked={astro.permissions[key]}
//                       disabled={!edit}
//                     ></input>
//                   </div>
//                 ))
//               : ""}
//             {edit ? (
//               <button type="submit" className={"btn btn-primary"}>
//                 {" "}
//                 Save
//               </button>
//             ) : null}
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// ) : (
//   "no user"
// )}
// </div>
