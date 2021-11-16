import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import WalletInfoCard from "./WalletInfoCard";
import {
  WalletWithdrawalStatus,
} from "../../dbObjects/WalletWithdrawal";
import walletManagment from "../../pages/admin/walletmanagement";
function WalletHistory(props) {
   const [totalPages, setTotalPages] = useState(
     props.data.length / props.ItemsPerPage
   );
  const [paginationData, setPaginationData] = useState(props.data);
  const [firstItem, setFirstItem] = useState(0);
  const [lastItem, setLastItem] = useState(props.ItemsPerPage);
  const [filter, setfilter] = useState({
    approved: true,
    rejected: true,
    completed: true,
  });

   useEffect(() => {
     setTotalPages(props.data.length / props.ItemsPerPage);
     setPaginationData(props.data);
     setfilter({
       approved: true,
       rejected: true,
       completed: true,
     });
   }, [props.data]);
  
  function myFilter(e) {
    return (
      (e.status == WalletWithdrawalStatus.APPROVED && filter.approved) ||
      (e.status == WalletWithdrawalStatus.REJECTED && filter.rejected) ||
      (e.status == WalletWithdrawalStatus.COMPLETED &&filter.completed));

  }

   async function handlePageChange({ selected }) {
     let last = (selected + 1) * props.ItemsPerPage;
     let first = last - props.ItemsPerPage;

     setFirstItem(first);
     setLastItem(last);
   }
  return (
    <div>
      <h4>History </h4>
      <div>
        <label htmlFor="approved"> Approved</label>
        <input
          type="checkbox"
          id="approved"
          checked={filter.approved}
          onChange={(e) => setfilter({ ...filter, approved: e.target.checked })}
        ></input>
        <label htmlFor="rejected"> rejected</label>

        <input
          type="checkbox"
          id="rejected"
          checked={filter.rejected}
          onChange={(e) => setfilter({ ...filter, rejected: e.target.checked })}
        ></input>
        <label htmlFor="completed"> completed</label>

        <input
          type="checkbox"
          id="completed"
          checked={filter.completed}
          onChange={(e) =>
            setfilter({ ...filter, completed: e.target.checked })
          }
        ></input>
      </div>

      {paginationData
        .filter(myFilter)
        .slice(firstItem, lastItem)
        .map((e) => (
          <WalletInfoCard key={e.id}data={e}></WalletInfoCard>
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
