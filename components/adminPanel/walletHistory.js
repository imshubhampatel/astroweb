import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import WalletInfoCard from "./WalletInfoCard";

function WalletHistory(props) {
   const [totalPages, setTotalPages] = useState(
     props.data.length / props.ItemsPerPage
   );
   const [firstItem, setFirstItem] = useState(0);
   const [lastItem, setLastItem] = useState(props.ItemsPerPage);

   useEffect(() => {
     setTotalPages(props.data.length / props.ItemsPerPage);
   }, [props.data]);

   async function handlePageChange({ selected }) {
     let last = (selected + 1) * props.ItemsPerPage;
     let first = last - props.ItemsPerPage;

     setFirstItem(first);
     setLastItem(last);
   }
  return (
    <div>
      <h4>History </h4>

      {props.data.slice(firstItem, lastItem).map((e) => (
        <WalletInfoCard
          data={e}
        ></WalletInfoCard>
      ))}
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
}

export default WalletHistory;
