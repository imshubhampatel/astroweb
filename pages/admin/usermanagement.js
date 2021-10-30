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
    endAt,
  startAt,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import SearchPagination from '../../components/adminPanel/SearchPagination'

const db = getFirestore(firebase);

const userManagement = withAdminAuth(() => {
  const [usersList, setusersList] = useState([]);
  const [totalusers, settotalusers] = useState(0);
  const ItemsPerPage = 2;
  const [totalPages, settotalPages] = useState(2);
  const [search, setsearch] = useState("");

  useEffect(() => {
    if (search == "") {
      initializePaginationData(90);
      getAllusers(0, ItemsPerPage);
    }
  }, [search]);

  function initializePaginationData(dataSize) {
    settotalusers(dataSize);
    settotalPages(dataSize / ItemsPerPage);
  }
  async function refresh()
  {
  initializePaginationData(90);
  getAllusers(0, ItemsPerPage);

  }

  async function getAllusers(first, numItems) {
    const astros = collection(db, "user");
    const querySnapshot = await getDocs(
      query(astros, orderBy("counter"), startAt(first), limit(numItems))
    );
    let data = querySnapshot.docs.map((doc) => doc.data());
    setusersList(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;

    getAllusers(first, ItemsPerPage);
  }
 
  async function searchHandler(search) {
    if (search != "")
    { 
    const astros = collection(db, "user");
    // email
    let querySnapshot = await getDocs(query(astros, where("email", "==", String(search)))); 
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

    return (<div>
          <div className="row">
            <div className="col-8">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Profile Link</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((e) => (
                    <tr key={e.phoneNumber}>
                      <td> 1 </td>
                      <td>{e.firstName + e.secondName}</td>
                      <td>{e.phoneNumber}</td>
                      <td>{e.email}</td>
                      <td>
                        {" "}
                        <Link
                          href={{
                            pathname: `/admin/user/${e.id}`,
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
        </div>);

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">Total users : {totalusers}</div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="text"
            placeholder="search by email or name"
            onChange={(e) => setsearch(e.target.value)}
          ></input>
          <button
            onClick={() => searchHandler(search)}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
        <div className="col">
          <button
            onClick={refresh}
            className="btn btn-success"
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
  );
});

userManagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="0">{page}</AdminLayout>;
};

export default userManagement;
