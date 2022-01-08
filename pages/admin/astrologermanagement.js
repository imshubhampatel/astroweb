import styles from "../../styles/pages/admin/astrologermanagement.module.css";

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import {EmployeePermissions} from  '../../dbObjects/Employee'
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import {Astrologer, astrologerStatus} from '../../dbObjects/Astrologer'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

const astrologermanagement = withAdminAuth(() => {
  
  const [astrologersList, setastrologersList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);
  const [totalAstrologers, settotalAstrologers] = useState(0);
  const ItemsPerPage = 10;
  const [isVerfiedFilter, setIsVerfiedFilter] = useState(false);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(ItemsPerPage);
  const [search, setSearch] = useState("");
  const [filterDetails, setFilterDetails] = useState({ enabled:0,profileComplete:0,verified:0});

  useEffect(() => {
    getAppDetails();
    initializePaginationData(astrologersList.filter(myFilter));
  }, [filterDetails]);
   
 async function getAppDetails() {
   const astros = collection(db, "app_details");
   const querySnapshot = await getDoc(
     doc(astros, "astrologerDetails")
     // .withConverter(UserConverter)
   );
   if (querySnapshot.exists()) {
     settotalAstrologers(querySnapshot.data().astrologerCount);
   } else {
     // console.log("no")
   }
 }
  function initializePaginationData(data) {
    setpaginationData(data);
    settotalAstrologers(data.length);
    settotalPages(data.length / ItemsPerPage);
    setfirstItemNum(0);
    setlastItemNum(ItemsPerPage);
  }

  async function getAllAstrologers() {
    const astros = query(collection(db, "astrologer"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) =>
    { return new Astrologer({id:doc.id, ...doc.data()})});
    setastrologersList(data);
    settotalAstrologers(data.length);
    initializePaginationData(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;
    setfirstItemNum(first);
    setlastItemNum(last);
  }

  function myFilter(item) {

    if (filterDetails.enabled) {
      if (
        (item.enabled == true &&
        filterDetails.enabled == 2) ||(
        item.enabled == false &&
        filterDetails.enabled == 1)
      ) {
        return false;
      }
    }
    if (filterDetails.profileComplete) {
      if (
        (item.profileComplete == true && filterDetails.profileComplete == 2) ||
        (item.profileComplete == false && filterDetails.profileComplete == 1)
      ) {
        return false;
      }
    }
    if (filterDetails.verified) {
      if (
        (item.status.state == astrologerStatus.VERIFIED &&
          filterDetails.verified == 2) ||
        (item.status.state != astrologerStatus.VERIFIED &&
          filterDetails.verified == 1)
      ) {
        return false;
      }
    }
    return true;
  };
  const filterView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div className="container">
          <h4>Filter</h4>
          <label htmlFor="verified">
            Verify
            <select
              id="verified"
              className="form-select"
              name="verified"
              defaultValue={0}
              onChange={(e) =>
                setFilterDetails({ ...filterDetails, verified: e.target.value })
              }
            >
              <option value={0}>ALL</option>
              <option value={1}> True</option>
              <option value={2}> False </option>
            </select>
          </label>
          <br />
          <label htmlFor="enabled">
            Enabled
            <select
              id="enabled"
              name="enabled"
              defaultValue={0}
              className="form-select"
              onChange={(e) =>
                setFilterDetails({ ...filterDetails, enabled: e.target.value })
              }
            >
              <option value={0}>ALL</option>
              <option value={1}> True</option>
              <option value={2}> False </option>
            </select>
          </label>
          <br />
          <label htmlFor="profileComplete">
            Profile Complete
            <select
              id="profileComplete"
              name="profileComplete"
              className="form-select"
              defaultValue={0}
              onChange={(e) =>
                setFilterDetails({ ...filterDetails, profileComplete: e.target.value })
              }
            >
              <option value={0}>ALL</option>
              <option value={1}> True</option>
              <option value={2}> False </option>
            </select>
          </label>
          <div className="text-end mt-4">
            <button
              className={"btn btn-success"}
              onClick={() => {
                Swal.clickConfirm();
              }}
            >
              Close
            </button>
          </div>
        </div>
      ),
    });
  };
  
  function searchHandler(event) {
    let val = event.target.value.toLowerCase();
    initializePaginationData(
      astrologersList.filter((e) => {
        if (
          e?.firstName?.toLowerCase().includes(val) ||
          e?.secondName?.toLowerCase().includes(val) ||
          e?.email?.toLowerCase().includes(val) ||
          e?.phoneNumber?.toLowerCase().includes(val) ||
          e?.profileComplete?.toString().toLowerCase().includes(val)
        )
          return true;
        else return false;
      })
    );
  }

  return (
    <>
      <div className={` ${styles.base_container} `}>
        <div className={`${styles.main_container}`}>
          <h2 className={`${styles.headingText}`}>
            Astrologer Management System
          </h2>
          <div className="container">
            <b>Total astrologer :</b> {totalAstrologers}
          </div>

          <div className={`${styles.topSearchContainer}`}>
            <input
              className={`${styles.searchBox}`}
              type="text"
              placeholder="Search by name/email/phone"
              onChange={searchHandler}
            />

            <div className={`${styles.buttonContainer}`}>
              <button
                className={`${styles.filterButton} ${styles.button} `}
                onClick={filterView}
              >
                Filter
              </button>
              <button
                className={`${styles.getButton} ${styles.button}`}
                onClick={() => getAllAstrologers()}
              >
                Get Astrologers
              </button>
              <Link href="/admin/questionset">
                <a className={`${styles.getButton} ${styles.button}`}>
                  Manage Question
                </a>
              </Link>
            </div>
          </div>

          <div className={`${styles.tableContainer}`}>
            <table className={`${styles.mainTable} table table-borderless`}>
              <thead>
                <tr className={`${styles.tableHeading}`}>
                  <td>Name</td>
                  <td>Rating</td>
                  <td>Phone Number </td>
                  <td>Profile Complete</td>
                  <td>State </td>
                  <td>Query</td>
                </tr>
              </thead>
              <tbody>
                {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                  <tr key={e.id} style={{}}>
                    <td className={`${styles.tableData}  `}>
                      {e.firstName + " " + e.secondName}
                    </td>
                    <td className={`${styles.tableData}`}>
                      {e.rating == "0" ? "Not rated" : e.rating}
                    </td>
                    <td className={`${styles.tableData}`}>
                      {e.phoneNumber}
                    </td>
                    <td className={`${styles.tableData}`}>
                      {e.profileComplete ? "True" : "false"}
                    </td>
                    <td className={`${styles.tableData}`}>{e.status.state}</td>
                    <td className={`${styles.tableData}`}>
                      <Link
                        href={{
                          pathname: `/admin/astrologer/${e.id}`,
                          query: { pid: e.id },
                        }}
                      >
                        <a target="_blank">View More</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{}}>
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
              activeClassName={` page-link active`}
            />
          </div>
        </div>
      </div>
    </>
  );
}, EmployeePermissions.ASTRO_MANAGEMENT);

astrologermanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};

export default astrologermanagement;


