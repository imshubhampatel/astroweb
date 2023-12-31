import React from 'react'
import BlogCard from './BlogCard'

function BlogsDashboard(props) {
    return (
      <>
      <div className='d-flex flex-column gap-2'>
        {" "}
        {props.data.map((e) => {
          return <BlogCard key={e.id} props={e} remove={props.remove}></BlogCard>;
        })}
      </div>
      {props.isSearchActive ? null :  <button className='my-3 btn btn-primary' onClick={() => props.getAfterBlog()}> View More</button>}

        </>
    );
}

export default BlogsDashboard
