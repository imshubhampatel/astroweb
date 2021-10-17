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
import useAdminAuth from "../../auth/useAdminAuth";

const db = getFirestore(firebase);

const userManagement = useAdminAuth(() => {
  const [usersList, setusersList] = useState([]);
  const [totalusers, settotalusers] = useState(0);
  const ItemsPerPage = 3;
  const [totalPages, settotalPages] = useState(2);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
  const [search, setsearch] = useState("");

    useEffect(() => {
        initializePaginationData(90);
        getAllusers(-1, 2);
  }, []);

  function initializePaginationData(dataSize) {
    settotalusers(dataSize);
    settotalPages(dataSize / ItemsPerPage);
    setfirstItemNum(0);
    setlastItemNum(ItemsPerPage);
  }

  async function getAllusers(first,last) {
    const astros = collection(db, "astrologer");
      const querySnapshot = await getDocs(query(astros, orderBy("email"), startAt(0), limit(2)));
      console.log("rf",querySnapshot.docs)
    let data = querySnapshot.docs.map((doc) => doc.data());
    setusersList(data);
  }

  function handlePageChange({ selected }) {
    let last = (selected + 1) * ItemsPerPage;
    let first = last - ItemsPerPage;
    getAllusers(first, last);
    setfirstItemNum(first);
    setlastItemNum(last);
  }
 
  function searchHandler() {
    if (search != "")
    {
    
      }
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
            onChange={setsearch}
          ></input>
          <button onClick={searchHandler} className="btn btn-primary">
            Search 
          </button>
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
    </div>
  );
});

userManagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="0">{page}</AdminLayout>;
};

export default userManagement;
