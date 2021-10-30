import React from 'react'
import { useState } from 'react'
import ReactPaginate from "react-paginate";
import Link from 'next/link'
const SearchPagination = (props) => {
    const [firstItemNum, setfirstItemNum] = useState(0);
    const [lastItemNum, setlastItemNum] = useState(props.ItemsPerPage);


    function handlePageChange({selected})
    {
        let last = (selected + 1) * props.ItemsPerPage;
        let first = last - ItemsPerPage;
        setfirstItemNum(first);
        setlastItemNum(last);

    }

    return (
      <div>
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
                {props.usersList.slice(firstItemNum, lastItemNum).map((e) => (
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
            pageCount={props.usersList.length / props.ItemsPerPage}
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

export default SearchPagination
