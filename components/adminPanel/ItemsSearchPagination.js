import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import styles from "../../styles/pages/admin/astrologermanagement.module.css";


const ItemsSearchPagination = (props) => {
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
                <th scope="col">Name</th>
                <th scope="col">Quantity Available</th>
                <th scope="col">Category</th>
                <th scope="col">Visible</th>
                <th scope="col">Mrp</th>
                <th scope="col">Add inventory</th>
                <th scope="col">Edit Item</th>
              </tr>
            </thead>
            <tbody>
              {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                <tr key={e.id}>
                  <td> 1 </td>
                  <td>{e.name}</td>
                  <td>{e.available}</td>
                  <td>{e.category}</td>
                  <td>{e.visible ? "TRUE":"FALSE"}</td>
                  <td>{e.mrp}</td>
                  <td><button className="btn btn-primary" onClick={()=>props.addInventoryView(e.id)}>
                      Add Inventory</button></td>
                  <td>
                    {" "}
                    <Link
                      href={{
                        pathname: `/admin/store/item/${e.id}`,
                        query: { pid: e.id },
                      }}
                    >
                      <a target="_blank">Edit</a>
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

export default ItemsSearchPagination;
