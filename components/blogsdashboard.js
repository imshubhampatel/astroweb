import React from 'react'
import BlogCard from './blogcard'
import BlogCardMobile from './blogcardmobile'

function BlogsDashboard(props) {
    return (
      <>
      <div>
      <div className='d-flex flex-column gap-1'>
        {" "}
        {props.data.map((e) => {
          return <BlogCardMobile key={e.id} props={e}></BlogCardMobile>;
        })}
        {props.data.map((e) => {
          return <BlogCard key={e.id} props={e}></BlogCard>;
        })}
      </div>

      <div>
          {props.isSearchActive ? null :  
          <button  className="btn btn-warning" onClick={() => props.getAfterBlog()}> View More</button>}
      </div>
      </div>
        </>
    );
}

export default BlogsDashboard
