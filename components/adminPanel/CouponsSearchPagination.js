import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import styles from "../../styles/pages/admin/astrologermanagement.module.css";


const CouponsSearchPagination = (props) => {
  const [paginationData, setpaginationData] = useState([]);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(props.ItemsPerPage);
  
  useEffect(() => {
    initializePaginationData(props.data);
  }, [props])
  function initializePaginationData(data) {
    setpaginationData(data);
    settotalPages(data.length / props.ItemsPerPage);
    setfirstItemNum(0);
    setlastItemNum(props.ItemsPerPage);
  }
  function handlePageChange({ selected }) {
    let last = (selected + 1) * props.ItemsPerPage;
    let first = last - ItemsPerPage;
    setfirstItemNum(first);
    setlastItemNum(last);
  }
  function searchHandler(event) {
    initializePaginationData(
      props.data.filter((e) => {
        if (
          e.code.includes(event.target.value)
        )
          return true;
        else return false;
      })
    );
  }

  return (
    <div>
      <div className="row">
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
              >
                Filters
              </button>
            </div>
          </div>

      </div>
      <div className="row">
        <div className="col-8">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Code</th>
                <th scope="col"> Start Date</th>
                <th scope="col"> Discount Type</th>
                <th scope="col"> Total Uses</th>
                <th scope="col"> Is active ? </th>
                <th scope="col"> Edit Coupon Details</th>
              </tr>
            </thead>
            <tbody>
              {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                <tr key={e.id}>
                  <td> 1 </td>
                  <td>{e.code}</td>
                  <td>{e?.startDate?.toDate()?.toDateString()}</td>
                  <td>{e.discountType}</td>
                  <td>{e.totalUses}</td>
                  <td>{e.live ? "YES" :"No"}</td>
                  <td>
                    {" "}
                   <button className="btn btn-primary" onClick={()=>props.editCouponView(e.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={props.data.length / props.ItemsPerPage}
          marginPagesDisplayed={2}
          onPageChange={(e) => handlePageChange(e)}
          containerClassName={"pagination"}
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
};

export default CouponsSearchPagination;
