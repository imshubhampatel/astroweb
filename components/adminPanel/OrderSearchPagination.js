import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import styles from "../../styles/pages/admin/astrologermanagement.module.css";


const OrderSearchPagination = (props) => {
  const [paginationData, setpaginationData] = useState([]);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(props.ItemsPerPage);
  
  useEffect(() => {
    initializePaginationData(props.data);
  }, [props.data])
  function initializePaginationData(data) {
    setpaginationData(data);
    settotalPages(props.totalOrders / props.ItemsPerPage);
    setfirstItemNum(0);
  }
  function handlePageChange({ selected }) {
    let last = (selected + 1) * props.ItemsPerPage;
    let first = last - props.ItemsPerPage;
    props.getAllOrders(first,last);
  }
  function searchHandler(event) {
    initializePaginationData(
      props.data.filter((e) => {
        if (
          e.name.includes(event.target.value)
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
                <th scope="col">Order ID</th>
                <th scope="col">Change Status</th>
                <th scope="col">Item Count</th>
                <th scope="col">Amount</th>
                <th scope="col">user</th>
                
              </tr>
            </thead>
            <tbody>
              {paginationData.map((e) => (
                <tr key={e.id}>
                  <td> 1 </td>
                  <td> 
                    <Link
                      href={{
                        pathname: `/admin/store/order/${e.id}`,
                        query: { pid: e.id },
                      }}
                    >
                      <a target="_blank">{e.id}</a>
                    </Link></td>
                  <td><button className="btn btn-primary" onClick={()=>props.onChangeOrderStatus(e)}>{e.status}</button></td>
                  <td>{e.itemCount}</td>
                  <td>{e.amount}</td>
                  <td>
                    {" "}
                    <Link
                      href={{
                        pathname: `/admin/user/${e.user}`,
                        query: { pid: e.user },
                      }}
                    >
                      <a target="_blank">User</a>
                    </Link>
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
          pageCount={props.totalOrders / props.ItemsPerPage}
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

export default OrderSearchPagination;
