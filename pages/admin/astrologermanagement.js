import React from 'react'
import {useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";

function astrologermanagement() {
    const [astrologersList, setastrologersList] = useState([
      "gek",
      "ek",
      "sek",
    ]);
    const [currentPageNum,setCurrentPageNum] = useState()
    const [totalNumberOfPages, settotalNumberOfPages] = useState(0);
    const [initialPageItemNum, setinitialPageItemNum] = useState(1);
    const [lastPageItemNum, setlastPageItemNum] = useState(2);

    // setastrologersList(["gek","ek","sek"]);

    useEffect(() => {
        
    })
    function handlePageChange(selected) {
        console.log(selected)

    }
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <button className="btn btn-primary">Get all Astrologers</button>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            {astrologersList
              .slice(initialPageItemNum, lastPageItemNum)
              .map((e) => (
                <h4>{e}</h4>
              ))}
          </div>
        </div>
        <div>
          <ReactPaginate
            initialPage={1}
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={10}
            marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            pageClassName={"page-link"}
            breakLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            activeClassName={"page-link active"}
          />
        </div>
      </div>
    );
}

export default astrologermanagement
