import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import styles from "../../styles/pages/admin/astrologermanagement.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const OrderSearchPagination = (props) => {
  const [paginationData, setpaginationData] = useState([]);
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(props.ItemsPerPage);
  const [search, setSearch] = useState("");
  const [isSearchActive, setSearchActive] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  useEffect(() => {
    initializePaginationData(props.data);
  }, [[...props.data]]);
  function initializePaginationData(data) {
    setpaginationData(data);
    settotalPages(props.totalOrders / props.ItemsPerPage);
    setSelectedPage(0);
  }
   function handlePageChange({ selected }) {
    if (selected > selectedPage) {
       props.getAllOrders(1);
    } else if (selected < selectedPage) {
       props.getAllOrders(0);
    }
    else {
       props.getAllOrders(-1);
    }

    setSelectedPage(selected);
  }
  function searchHandler() {
    if (search.length == 0 || /^\s+$/.test(search)) {
      return;
    }
    props.searchOrder(search);
    setSearchActive(true);
    setSelectedPage(0);
  }
  async function filterViewHandler(e) {
    e.preventDefault();
    props.getAllOrdersByDate(e.target.date.value);
    MySwal.clickConfirm();

    
  }
  async function filterView() {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={filterViewHandler}>
            <label htmlFor="date"> Date </label>
            <input
              className="form-control"
              placeholder="Date"
              name="date"
              id="date"
              type="date"
            />
            {/* <label for="dateSort"> Sort by Date </label>
            <select className="form-select" name="dateSort" id="dateSort">
              <option value={1}> ASC </option>
              <option value={0}> DSC </option>
            </select>
            <label for="amountSort"> Sort by Amount </label>
            <select className="form-select" name="amountSort" id="amountSort">
              <option value={1}> ASC </option>
              <option value={0}> DSC </option>
            </select> */}

            <div className="text-end mt-4">
              <button className="btn btn-success" type="submit">
                Apply Filter
              </button>
            </div>
          </form>
        </div>
      ),
      preConfirm: () => {},
    });
  }

  return (
    <div>
      <div className="row">
        <div className={`${styles.topSearchContainer}`}>
          <input
            className={`${styles.searchBox}`}
            type="text"
            placeholder="Search by Order ID / USER ID"
            onChange={(e) => {
              if (e.target.value == "" && isSearchActive) {
                handlePageChange({ selected: 0 });
                setSearchActive(false);
              }
              setSearch(e.target.value);
            }}
            
          />
          <button className="btn btn-success" onClick={searchHandler}>
            Search
          </button>

          <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.filterButton} ${styles.button} `}
              onClick={filterView}
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
              {paginationData?.map((e) => (
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
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => props.onChangeOrderStatus(e)}
                    >
                      {e.status}
                    </button>
                  </td>
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

      {isSearchActive ? null : (
        <div>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={props.totalOrders / props.ItemsPerPage}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
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
      )}
    </div>
  );
};

export default OrderSearchPagination;
