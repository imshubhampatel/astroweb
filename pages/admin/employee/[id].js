import layoutStyles from "../../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../../styles/pages/admin/employee/[id].module.css";
import FireImage from "../../../components/FireImage";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";
import SimpleToggleButton from "../../../components/SimpleToggleButton";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFile } from "../../../utilities/utils";
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
import { employeeConverter, Employee , EmployeePermissions } from "../../../dbObjects/Employee";

const db = getFirestore(firebase);

const employee = withAdminAuth(() => {

// const employee = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  var [enabled, setenabled] = useState(true);
  const [edit, setedit] = useState(false);
  const [verificationIdLink, setverificationIdLink] = useState("");
  const [panardLink, setpancardLink] = useState("");

  async function getemployeeInfo(pid) {
    const astros = collection(db, "employee");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(employeeConverter)
    );
    if (querySnapshot.exists()) {
      return querySnapshot.data();
    } else {
      return {};
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
    getemployeeInfo(pid).then(data => {
      setastro(data);
      // getFile(data.verificationId).then((d) => setverificationIdLink(d)).catch();
      // getFile(data.pancardLink).then((d) => setpancardLink(d)).catch();
    });
    if (pid)
      isSubAdmin(pid).then((e) => {
        if (e) setenabled(true);
        else setenabled(false);
      });
  }, [pid]);

  async function permissionChangeHandler(astro_temp_perm) {
    const emp = {
      ...astro,
      permissions: {
        astro_management: astro_temp_perm.astro_management,
        emp_management: astro_temp_perm.emp_management,
        wallet_management: astro_temp_perm.wallet_management,
        user_management: astro_temp_perm.user_management,
        broadcast_management: astro_temp_perm.broadcast_management,
        store: astro_temp_perm.store,
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
            <h4>{astro?.firstName +" " + astro?.secondName}</h4>

            <div className={`d-flex gap-1 flex-column`}>
              <div className={``}>{astro?.address}</div>

              <div className={``}>{astro.phoneNumber}</div>

              <div className={``}>{astro.email}</div>
            </div>
          </div>

          <div>
            Enabled{" "}
            <SimpleToggleButton
              initialState={
                enabled !=null
                  ? enabled
                  : "not-set"
              }
              size="32"
              clickHandler={() => {
                toggleEnable(pid);
              }}
            />
          </div>
        </div>

        {/* Documents  */}
        <div className="my-2">
          <div className="d-flex gap-3 align-items-center">
            <h5>Documents </h5>
            <div
              style={{ height: "0.3px" }}
              className="border-top flex-grow-1"
            />
          </div>
          Aadhar Card :{" "}
          {astro.verificationId ? (
            <div className={`${styles.empPhoto}`}>
              <FireImage
                src={astro.verificationId}
                alt="Aadhar Card"
                layout="fill"
              />
            </div>
          ) : (
            ""
          )}
          <br />
          Pancard:
          {astro.pancardLink ? (
            <div className={`${styles.empPhoto}`}>
              <FireImage
                src={astro.pancardLink}
                alt="Profile Picture"
                layout="fill"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <br />

        {/* Permissions   */}
        <div className={`${styles.permissionsContainer}`}>
          <div className="d-flex gap-3 align-items-center">
            <h5>Permissions</h5>
            <div
              style={{ height: "0.3px" }}
              className="border-top flex-grow-1"
            ></div>
          </div>

          <div className={`${styles.twoGridLayout}`}>
            <div className={`${styles.gridItem}`}>
              {" "}
              Astro management
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions
                      ? astro.permissions.astro_management
                      : "not-set"
                  }
                  size="32"
                  clickHandler={() => {
                    let temp = astro.permissions;
                    temp.astro_management = !temp.astro_management;
                    permissionChangeHandler(temp);
                  }}
                />
              </div>
            </div>

            <div className={`${styles.gridItem}`}>
              {" "}
              User management
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions
                      ? astro.permissions.user_management
                      : "not-set"
                  }
                  size="32"
                  clickHandler={() => {
                    let temp = astro.permissions;
                    temp.user_management = !temp.user_management;
                    permissionChangeHandler(temp);
                  }}
                />
              </div>
            </div>
            <div className={`${styles.gridItem}`}>
              {" "}
              Broadcast management
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions
                      ? astro.permissions.broadcast_management
                      : "not-set"
                  }
                  size="32"
                  clickHandler={() => {
                    let temp = astro.permissions;
                    temp.broadcast_management = !temp.broadcast_management;
                    permissionChangeHandler(temp);
                  }}
                />
              </div>
            </div>
            <div className={`${styles.gridItem}`}>
              {" "}
              Wallet management
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions
                      ? astro.permissions.wallet_management
                      : "not-set"
                  }
                  size="32"
                  clickHandler={() => {
                    let temp = astro.permissions;
                    temp.wallet_management = !temp.wallet_management;
                    permissionChangeHandler(temp);
                  }}
                />
              </div>
            </div>

            <div className={`${styles.gridItem}`}>
              {" "}
              Employee management
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions
                      ? astro.permissions.emp_management
                      : "not-set"
                  }
                  size="32"
                  clickHandler={() => {}}
                />
              </div>
            </div>
            <div className={`${styles.gridItem}`}>
              {" "}
              Store
              <div className="float-end">
                <SimpleToggleButton
                  initialState={
                    astro.permissions ? astro.permissions.store : "not-set"
                  }
                  size="32"
                  clickHandler={() => {
                    let temp = astro.permissions;
                    temp.store = !temp.store;
                    permissionChangeHandler(temp);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
},EmployeePermissions.EMP_MANAGEMENT);

employee.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};
export default employee;
