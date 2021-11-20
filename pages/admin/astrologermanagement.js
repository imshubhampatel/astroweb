import styles from "../../styles/pages/admin/astrologermanagement.module.css";

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
import {Astrologer, astrologerStatus} from '../../dbObjects/Astrologer'

const db = getFirestore(firebase);

const astrologermanagement = withAdminAuth(() => {
  
  const [astrologersList, setastrologersList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);
  const [totalAstrologers, settotalAstrologers] = useState(0);
  const ItemsPerPage = 4;
  const [isVerfiedFilter, setIsVerfiedFilter] = useState(false);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(ItemsPerPage);
  const [search, setSearch] = useState("");

  useEffect(() => {
    initializePaginationData(astrologersList.filter(myFilter));
  }, [isVerfiedFilter]);

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
    initializePaginationData(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;
    setfirstItemNum(first);
    setlastItemNum(last);
  }

  function myFilter(item) {
    if (isVerfiedFilter) {
      if (item.status.state == astrologerStatus.VERIFIED) return false;
      else return true;
    }
    return true;
  };
  
  function searchHandler(event) {
    initializePaginationData(
      astrologersList.filter((e) => {
        if (
          e.firstName.includes(event.target.value) ||
          e.secondName.includes(event.target.value) ||
          e.email.includes(event.target.value)
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
                onClick={() => setIsVerfiedFilter(!isVerfiedFilter)}
              >
                Filter Unverified
              </button>
              <button
                className={`${styles.getButton} ${styles.button}`}
                onClick={() => getAllAstrologers()}
              >
                Get Astrologers
              </button>
              <Link
                href="/admin/questionset"
              >
                <a className={`${styles.getButton} ${styles.button}`}
>
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
                  <td>Phone Number</td>
                  <td>Rating</td>
                  <td>State </td>
                  <td>Query</td>
                </tr>
              </thead>
              <tbody>
                {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                  <tr key={e.id} style={{}}>
                    <td className={`${styles.tableData}  `}>
                      {e.firstName + e.secondName}
                    </td>
                    <td className={`${styles.tableData} `}> {e.phoneNumber}  </td>
                    <td className={`${styles.tableData}`}>
                      {e.rating == "0" ? "Not rated" : e.rating}
                    </td>
                    <td className={`${styles.tableData}`}>
                      {e.status.state}
                    </td>
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
    </>);
}, "astro");

astrologermanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};

export default astrologermanagement;


