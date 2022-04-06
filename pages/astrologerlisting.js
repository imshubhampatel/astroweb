import React, { useState, useEffect } from "react";
import Card from '../components/Card';
import Filter from '../components/filter';
import  {SearchBar} from '../components/pgTools';
import styles from '../styles/components/astrologerlisting/astrologer.module.css';

import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    doc,
    getDoc,
    getFirestore,
    setDoc,
  } from "firebase/firestore";
  import { firebase } from "../config";
  import {Astrologer, astrologerStatus} from '../dbObjects/Astrologer'
  import ReactPaginate from "react-paginate";

const db = getFirestore(firebase);

function AstrologerListing() {
    
    const [astrologersList, setastrologersList] = useState([]);
    const [paginationData, setpaginationData] = useState([]);
    const [totalAstrologers, settotalAstrologers] = useState(0);
    const [totalCount, settotalCount] = useState(0);
    const ItemsPerPage = 10;
    const [totalPages, settotalPages] = useState(2);
    const [firstItemNum, setfirstItemNum] = useState(0);
    const [lastItemNum, setlastItemNum] = useState(ItemsPerPage);
    function initializePaginationData(data) {
        setpaginationData(data);
        settotalAstrologers(data.length);
        settotalPages(data.length / ItemsPerPage);
        setfirstItemNum(0);
        setlastItemNum(ItemsPerPage);
      }
    
    useEffect(() => {
        getAllAstrologers();
        // initializePaginationData(astrologersList.filter(myFilter));
      }, []);
      async function getAllAstrologers() {
        const astros = query(collection(db, "astrologer"),orderBy("firstName"),where("enabled",'==',true),where("status.state",'==','verified'));
        const querySnapshot = await getDocs(astros);
        let data = querySnapshot.docs.map((doc) =>
        { return new Astrologer({id:doc.id, ...doc.data()})});
        setastrologersList(data);
        settotalAstrologers(data.length);
        initializePaginationData(data);
      }   
      function handlePageChange({ selected }) {
        let last = (selected + 1) * ItemsPerPage;
        let first = last - ItemsPerPage;
        setfirstItemNum(first);
        setlastItemNum(last);
      } 
      
function searchHandler(event) {
    let val = event.target.value.toLowerCase();
    initializePaginationData(
      astrologersList.filter((e) => {
        if (
          e?.firstName?.toLowerCase().includes(val) ||
          e?.secondName?.toLowerCase().includes(val) ||
          e?.email?.toLowerCase().includes(val) ||
          e?.phoneNumber?.toLowerCase().includes(val) ||
          e?.profileComplete?.toString().toLowerCase().includes(val) ||
          e?.pricingCategory ?.toString().toLowerCase().includes(val)
        )
          return true;
        else return false;
      })
    );
  }
  function filterHandler(state) {

    initializePaginationData(
      astrologersList.filter((e) => {
        if (
          state[e?.currentStatus]
        )
          return true;
        else return false;
      })
    );
  }

    return (
        <div className={styles.astrologerlist}>
            <div className={styles.pgtoolscontainer}>
                <h2 className={styles.pgtoolstitle}>Our Astrologers</h2>
                 {/* <SortBy cssmodule={styles} />  */}
                <SearchBar cssmodule={styles} searchHandler={searchHandler}/>
            </div>
            <div>
            <div className={styles.filtercontainer}>
                <span className={styles.title}>Filter By</span>
                <Filter cssmodule={styles} filterHandler={filterHandler} />
                {/* <Filter cssmodule={styles} />
                <Filter cssmodule={styles} />
                <Filter cssmodule={styles} /> */}
            </div>
            <div className={styles.cardscontainer}>
                <div className={styles.title} data-status="green">Astrologers online - 2331</div>
                <div className={styles.cards}>
                    {paginationData.slice(firstItemNum, lastItemNum).map((e) => ( <Card key={e.id}cssmodule={styles} data={e} />))}
                </div>
            </div>
            </div>
            
            <div>
            <div className={styles.paginateContainer}>
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              onPageChange={(e) => handlePageChange(e)}
              containerClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              previousLinkClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              pageClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              breakLinkClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              nextLinkClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              disabledClassName={`pagination ${styles.paginationContainer} ${styles.centerDivFlex}`}
              activeClassName={` page-link active`}
            />
            </div>
            </div>
        </div>
    );
}

export default AstrologerListing;




