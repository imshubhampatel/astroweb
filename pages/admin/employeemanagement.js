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

const employeemanagement = useAdminAuth(() => {
  const [employeesList, setemployeesList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);
  const [totalemployees, settotalemployees] = useState(0);
  const ItemsPerPage = 3;
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
  const [search, setSearch] = useState("");

  useEffect(() => {}, []);

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
    <div className="container">
      <div className="row">
        <div className="col-12">Total employees : {totalemployees}</div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={() => getAllemployees()}>
            Get all employees
          </button>

          <Link href="/admin/employee/register">
            <a className="btn btn-primary" target="_blank">
              Add Employee
            </a>
          </Link>

          <input
            type="text"
            placeholder="search by email or name"
            onChange={searchHandler}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email Address</th>
                <th scope="col">Actions</th>
                <th scope="col">Profile Link</th>
              </tr>
            </thead>
            <tbody>
              {paginationData.slice(firstItemNum, lastItemNum).map((e) => (
                <tr key={e.phoneNumber}>
                  <td> 1 </td>
                  <td>{e.firstName + e.secondName}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.email}</td>
                  <td> {e.verified} </td>
                  <td>
                    {" "}
                    <Link
                      href={{
                        pathname: `/admin/employee/${e.id}`,
                        query: { pid: e.id },
                      }}
                    >
                      <a target="_blank">click me</a>
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
          pageCount={totalPages}
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
});

employeemanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};

export default employeemanagement;
