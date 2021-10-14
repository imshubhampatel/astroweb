import React from 'react'
import {useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import AdminPanelLayout from '../../components/AdminPanelLayout'
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";
import {firebase} from '../../config'
import Link from 'next/link'

const db = getFirestore(firebase);

function astrologermanagement() {
  const [astrologersList, setastrologersList] = useState([]);
  const [paginationData, setpaginationData] = useState([]);

  const [totalAstrologers, settotalAstrologers] = useState(0);
  const ItemsPerPage = 10;
  const [isVerfiedFilter, setIsVerfiedFilter] = useState(false);
  const [totalPages, settotalPages] = useState(10);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
  
  useEffect(() => {
    initializePaginationData(astrologersList.filter(myFilter));
  },[isVerfiedFilter])

  function initializePaginationData(data)
  {
  console.log(data.length,data)
  setpaginationData(data);
  settotalAstrologers(data.length);
  settotalPages(data.size / ItemsPerPage);
  setfirstItemNum(0);
  setlastItemNum(ItemsPerPage);
  };
  
  async function getAllAstrologers() {
    const astros = query(collection(db, "astrologer"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map(doc => doc.data())
    setastrologersList(data);
    initializePaginationData(data);
  };
  
  function handlePageChange({selected}) {
      let last = (selected +1) * ItemsPerPage;
      let first = last - ItemsPerPage;
    setfirstItemNum(first);
    setlastItemNum(last);
  };
  
  function myFilter(item) {
    if (isVerfiedFilter) {
      if (item.verified)
        return false;
      else return true;
    }
    return true;
  };

    return (
      <AdminPanelLayout>
        <div className="row">
          <div className="col-12">Total Astrologers : {totalAstrologers}</div>
        </div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => getAllAstrologers()}
            >
              Get all Astrologers
            </button>

            <button
              className="btn btn-primary"
              onClick={() => setIsVerfiedFilter(!isVerfiedFilter)}
            >
              Filter Unverified
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
                          pathname: `/admin/astrologer/${e.id}`,
                          query: { pid:e.id },
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
      </AdminPanelLayout>
    );
}

export default astrologermanagement
