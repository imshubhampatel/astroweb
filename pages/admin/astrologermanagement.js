import styles from "../../styles/pages/admin/astrologermanagement.module.css";

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
import useAdminAuth from "../../auth/useAdminAuth";

const db = getFirestore(firebase);

const astrologermanagement = useAdminAuth(() => {
  
  const [astrologersList, setastrologersList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);
  const [totalAstrologers, settotalAstrologers] = useState(0);
  const ItemsPerPage = 10;
  const [isVerfiedFilter, setIsVerfiedFilter] = useState(false);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
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
    let data = querySnapshot.docs.map((doc) => doc.data());
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
      if (item.verified) return false;
      else return true;
    }
    return true;
  }
  function searchHandler(event) {
    initializePaginationData(
      astrologersList.filter((e) => {
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
                Filters
              </button>
              <button
                className={`${styles.getButton} ${styles.button}`}
                onClick={() => getAllAstrologers()}
              >
                Get Astrologers
              </button>
            </div>
          </div>

          <div className={`${styles.tableContainer}`}>
            <table className={`${styles.mainTable} table table-borderless`}>
              <thead>
                <tr className={`${styles.tableHeading}`}>
                  <td>Name</td>
                  <td>Phone Number</td>
                  <td>Rating</td>
                  <td>Verify</td>
                  <td>Query</td>
                </tr>
              </thead>
              <tbody>
                {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                  <tr key={e.id} style={{}}>
                    <td className={`${styles.tableData}  `}>
                      {e.firstName + e.secondName}
                    </td>
                    <td className={`${styles.tableData} `}>{e.phoneNumber}</td>
                    <td className={`${styles.tableData}`}>
                      {e.rating == "0" ? "Not rated" : e.rating}
                    </td>
                    <td className={`${styles.tableData}`}>
                      {e.verified ? "Verified" : "Not Verfied"}
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
    </>
  );
});

astrologermanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};

export default astrologermanagement;

// return (
//   <div className="container">
//     <div className="row">
//       <div className="col-12">Total Astrologers : {totalAstrologers}</div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <button
//           className="btn btn-primary"
//           onClick={() => getAllAstrologers()}
//         >
//           Get all Astrologers
//         </button>

//         <button
//           className="btn btn-primary"
//           onClick={() => setIsVerfiedFilter(!isVerfiedFilter)}
//         >
//           Filter Unverified
//         </button>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-8">
//         <table className="table">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Phone Number</th>
//               <th scope="col">Email Address</th>
//               <th scope="col">Actions</th>
//               <th scope="col">Profile Link</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
//               <tr key={e.phoneNumber}>
//                 <td> 1 </td>
//                 <td>{e.firstName + e.secondName}</td>
//                 <td>{e.phoneNumber}</td>
//                 <td>{e.email}</td>
//                 <td> {e.verified} </td>
//                 <td>
//                   {" "}
//                   <Link
//                     href={{
//                       pathname: `/admin/astrologer/${e.id}`,
//                       query: { pid: e.id },
//                     }}
//                   >
//                     <a target="_blank">click me</a>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>

//     <div>
//       <ReactPaginate
//         previousLabel={"← Previous"}
//         nextLabel={"Next →"}
//         breakLabel={"..."}
//         pageCount={totalPages}
//         marginPagesDisplayed={2}
//         onPageChange={(e) => handlePageChange(e)}
//         containerClassName={"pagination"}
//         previousLinkClassName={"page-link"}
//         pageClassName={"page-link"}
//         breakLinkClassName={"page-link"}
//         nextLinkClassName={"page-link"}
//         disabledClassName={"page-item disabled"}
//         activeClassName={"page-link active"}
//       />
//     </div>
//   </div>
// );
