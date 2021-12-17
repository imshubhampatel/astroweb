import layoutStyles from "../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../styles/pages/admin/employeemanagement.module.css";
import SimpleTogleButton from "../../components/SimpleToggleButton"
import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import {EmployeePermissions} from  '../../dbObjects/Employee'

const db = getFirestore(firebase);

const employeemanagement = withAdminAuth(() => {
  const [employeesList, setemployeesList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);
  const [totalemployees, settotalemployees] = useState(0);
  const ItemsPerPage = 3;
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAppDetails();
  }, []);
   async function getAppDetails() {
     const astros = collection(db, "app_details");
     const querySnapshot = await getDoc(
       doc(astros, "adminDetails")
       // .withConverter(UserConverter)
     );
     if (querySnapshot.exists()) {
       setastro(querySnapshot.data().adminCount);
     } else {
       // console.log("no")
     }
   }

  function initializePaginationData(data) {
    setpaginationData(data);
    settotalemployees(data.length);
    settotalPages(data.length / ItemsPerPage);
    setfirstItemNum(0);
    setlastItemNum(ItemsPerPage);
  }

  async function getAllemployees() {
    const astros = query(collection(db, "employee"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => doc.data());
    setemployeesList(data);
    initializePaginationData(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;
    setfirstItemNum(first);
    setlastItemNum(last);
  }
 

  function searchHandler(event) {
    initializePaginationData(
      employeesList.filter((e) => {
        if (
          e.firstName.includes(event.target.value) ||
          e.secondName.includes(event.target.value) ||
          e.email.includes(event.target.value)
        )
          return true;
      })
    );
  }


  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>
          Employee Management System
        </h2>

        <div className={styles.topSearchContainer}>
          <input
            className={`${styles.searchBox}`}
            type="text"
            placeholder="Search by name/email"
            onChange={searchHandler}
          />

          <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.filterButton} ${styles.button} `}
              onClick={() => {}}
            >
              Filter
            </button>
            <Link href="employee/register">
              <a className={`${styles.filterButton} ${styles.button} `}>
                Add Employee
              </a>
            </Link>

            <button
              className={`${styles.getButton} ${styles.button}`}
              onClick={() => getAllemployees()}
            >
              Get Employees
            </button>
          </div>
        </div>

        <div className={`${styles.tableContainer}`}>
          <table className={`${styles.mainTable} table table-borderless`}>
            <thead>
              <tr className={`${styles.tableHeading}`}>
                <td># </td>
                <td>Name</td>
                <td>Phone Number</td>
                <td>Email</td>
                <td>Profile Link </td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {paginationData.slice(firstItemNum, lastItemNum).map((e, idx) => (
                <tr key={e.phoneNumber + idx}>
                  <td className={`${styles.tableData}  `}> {idx + 1} </td>
                  <td className={`${styles.tableData}  `}>
                    {e.firstName + e.secondName}
                  </td>
                  <td className={`${styles.tableData}  `}>{e.phoneNumber}</td>
                  <td className={`${styles.tableData}  `}>{e.email}</td>

                  <td className={`${styles.tableData}  `}>
                    {" "}
                    <Link
                      href={{
                        pathname: `/admin/employee/${e.id}`,
                        query: { pid: e.id },
                      }}
                    >
                      <a target="_blank">Link</a>
                    </Link>
                  </td>
                  <td className={`${styles.tableData}  `}>
                    {e.verified ? "Enabled" : "Disabled"}
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
      </div>
    </div>
  );
},EmployeePermissions.EMP_MANAGEMENT);

employeemanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};

export default employeemanagement;
