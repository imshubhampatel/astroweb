import layoutStyles from "../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../styles/pages/admin/usermanagement.module.css";

import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  where,
  getDocs,
  getFirestore,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  endAt,
  startAt,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import SearchPagination from '../../components/adminPanel/SearchPagination'
import {EmployeePermissions} from  '../../dbObjects/Employee'

const db = getFirestore(firebase);

const userManagement = withAdminAuth(() => {
  const [usersList, setusersList] = useState([]);
  const [totalusers, settotalusers] = useState(0);
  const ItemsPerPage = 10;
  const [totalPages, settotalPages] = useState(2);
  const [search, setsearch] = useState("");

  useEffect(() => {
    getAppDetails();
    if (search == "") {
      initializePaginationData(totalusers);
      getAllusers(0, ItemsPerPage);
    }
  }, [search]);
  useEffect(() => {

      initializePaginationData(totalusers);
    
  }, [totalusers]);
   async function getAppDetails() {
     const astros = collection(db, "app_details");
     const querySnapshot = await getDoc(
       doc(astros, "userDetails")
       // .withConverter(UserConverter)
     );
     if (querySnapshot.exists()) {
       settotalusers(querySnapshot.data().userCount);
       
     } else {
       // console.log("no")
     }
   }

  function initializePaginationData(dataSize) {
    settotalPages(dataSize / ItemsPerPage);
  }
  async function refresh() {
    initializePaginationData(totalusers);
    getAllusers(0, ItemsPerPage);
  }

  async function getAllusers(first, numItems) {
    const astros = collection(db, "user");
    const querySnapshot = await getDocs(
      query(astros, orderBy("counter"), startAt(first), limit(numItems))
    );
    let data = querySnapshot.docs.map((doc) => {
      return {id : doc.id, ...doc.data()}});
    console.log(data.length)

    setusersList(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;
    getAllusers(first, ItemsPerPage);
  }

  async function searchHandler(search) {
    if (search != "") {
      const astros = collection(db, "user");
      // email
      let querySnapshot = await getDocs(
        query(astros, where("email", "==", String(search)))
      );
      let data = new Set();
      querySnapshot.docs.map((doc) => data.add(doc.data()));

      // first Name
      querySnapshot = await getDocs(
        query(astros, where("firstName", "==", String(search)))
      );
      querySnapshot.docs.map((doc) => data.add(doc.data()));

      // Phone Number
      querySnapshot = await getDocs(
        query(astros, where("phoneNumber", "==", String(search)))
      );
      querySnapshot.docs.map((doc) => data.add(doc.data()));
      setusersList(Array.from(data));
    }
  }

  function renderUserPagination() {
    return (
      <>
        <div className={`${styles.tableContainer}`}>
          <table className={`${styles.mainTable} table table-borderless`}>
            <thead>
              <tr className={`${styles.tableHeading}`}>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Profile Link</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((e, idx) => (
                <tr key={e.phoneNumber + idx}>
                  <td className={`${styles.tableData}  `}> {idx + 1} </td>
                  <td className={`${styles.tableData}  `}>
                    {e.firstName + " " + e.lastName}
                  </td>
                  <td className={`${styles.tableData}  `}>{e.phoneNumber}</td>
                  <td className={`${styles.tableData}  `}>{e.email}</td>
                  <td className={`${styles.tableData}  `}>
                    {" "}
                    <Link
                      href={{
                        pathname: `/admin/user/${e.id}`,
                        query: { pid: e.id },
                      }}
                    >
                      <a target="_blank">Link</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          onPageChange={(e) => handlePageChange(e)}
          containerClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
          previousLinkClassName={"page-link"}
          pageClassName={"page-link"}
          breakLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"page-item disabled"}
          activeClassName={"page-link active"}
        />
      </>
    );
  }

  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>
          User Management System
        </h2>

        <div className={styles.statsContainer}>
          <div className={styles.statsItem}>
            <div className={styles.statsText}>Total Users</div>

            <div className={styles.statsNumber}>{totalusers}</div>
          </div>

          <div className={styles.statsItem}>
            <div className={styles.statsText}>Engaging Users</div>

            <div className={styles.statsNumber}>12289</div>
          </div>

          <div className={styles.statsItem}>
            <div className={styles.statsText}>Offlline Users</div>

            <div className={styles.statsNumber}>12289</div>
          </div>
        </div>

        <div className={styles.topSearchContainer}>
          <input
            className={`${styles.searchBox}`}
            type="text"
            placeholder="Search by name/email"
            onChange={(e) => setsearch(e.target.value)}
          />

          <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.filterButton} ${styles.button} `}
              onClick={()=>searchHandler(search)}
            >
              Search
            </button>

            <button
              className={`${styles.getButton} ${styles.button}`}
              onClick={refresh}
            >
              Refresh
            </button>
          </div>
        </div>

        {search != "" ? (
          <SearchPagination ItemsPerPage={ItemsPerPage} usersList={usersList} />
        ) : (
          renderUserPagination()
        )}
      </div>
    </div>
  );
},EmployeePermissions.USER_MANAGEMENT);

userManagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="0">{page}</AdminLayout>;
};

export default userManagement;

