import React from 'react'
import {useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import AdminPanelLayout from '../../components/AdminPanelLayout'
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";
import {firebase} from '../../config'
import { set } from 'js-cookie';
import Link from 'next/link'

const db = getFirestore(firebase);

function astrologermanagement() {
  const [astrologersList, setastrologersList] = useState([]);

  const [totalAstrologers, settotalAstrologers] = useState(0);
  const ItemsPerPage = 10;

  const [currentPageNum, setCurrentPageNum] = useState();
  const [totalPages, settotalPages] = useState(10);
  const [firstItemNum, setfirstItemNum] = useState(0);
  const [lastItemNum, setlastItemNum] = useState(3);
  
  useEffect(() => {
    setfirstItemNum(0)
    setlastItemNum(2)
  },[])

    // setastrologersList(["gek","ek","sek"]);
  
  async function getAllAstrologers() {
    const astros = query(collection(db, "testing"));

    const querySnapshot = await getDocs(astros);
    let temp = querySnapshot.docs.map(doc => doc.data())

    setastrologersList(temp);
    settotalAstrologers(querySnapshot.size);
    settotalPages(querySnapshot.size / ItemsPerPage);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  };
  
  function handlePageChange(selected) {
      let last = selected * ItemsPerPage;
      let first = last - ItemsPerPage;
      setfirstItemNum(first)
      setlastItemNum(last)
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
          </div>
          <Link href="/admin/astrologer/lol">
            <a target="_blank">click me</a>
          </Link>
        </div>
        <div className="row">
          <div className="col-8">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {astrologersList.slice(firstItemNum, lastItemNum).map((e) => (
                  <tr>
                    <td>{e.firstName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <ReactPaginate
            initialPage={1}
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            onPageChange={() => handlePageChange()}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            pageClassName={"page-link"}
            breakLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            activeClassName={"page-link active"}
          />
        </div>
      </AdminPanelLayout>
    );
}

export default astrologermanagement
