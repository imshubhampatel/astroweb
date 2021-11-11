import React from 'react'
import Link from 'next/link'
export default function BlogCard({props}) {
  return (
    <Link
      href={{
        pathname: `/admin/blog/${props.id}`,
        query: { pid: props.id },
      }}
    >
      <a target="_blank">
        <div className="card bg-light mb-3">
          <div className="card-header">Title : {props.title}</div>
          <div className="card-body">
            {props.id}
            <p className="card-text">Author : {props.author}</p>
            <p className="card-text">description : {props.description.slice(0,100)}...</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
