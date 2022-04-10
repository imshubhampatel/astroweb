import React from 'react'
import BlogCard from './blogcard'

function BlogsDashboard(props) {
    return (
      <>
      <div className='d-flex flex-column gap-2'>
        {" "}
        {props.data.map((e) => {
          return <BlogCard key={e.id} props={e}></BlogCard>;
        })}
      </div>

      <div>
          {props.isSearchActive ? null :  
          <button  onClick={() => props.getAfterBlog()}> View More</button>}
      </div>
        </>
    );
}

export default BlogsDashboard
