import React from 'react'
import BlogCard from './BlogCard'

function BlogsDashboard(props) {
    return (
      <div>
        {" "}
        {props.data.map((e) => {
          return (
            <BlogCard
              key={e.id}
              props={e}
            ></BlogCard>
          );
        })}
        <button onClick={() => props.getAfterBlog()}> View More</button>
      </div>
    );
}

export default BlogsDashboard
