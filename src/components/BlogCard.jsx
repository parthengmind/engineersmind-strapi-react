// import React from "react";
// import { Link } from "react-router-dom";
// import "./../styles/Blogs.scss";

// const BlogCard = ({ blog }) => {
//   const imageUrl = blog?.thumbnail?.formats?.small?.url
//     ? `http://localhost:1337${blog.thumbnail.formats.small.url}`
//     : "/fallback-image.jpg"; // optional fallback

//   return (
//     <Link
//       to={`/blogs/${blog.id}`}
//       className="blog-card"
//       style={{ textDecoration: "none", color: "inherit" }}
//     >
//       <img
//         className="blog-thumbnail"
//         src={imageUrl}
//         alt={blog.thumbnail?.name || blog.title}
//       />
//       <div className="blog-content">
//         <h3 className="blog-title">{blog.title}</h3>
//         <p className="blog-description">{blog.shortDescription}</p>
//       </div>
//     </Link>
//   );
// };

// export default BlogCard;



// / components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blogs.scss';

const BlogCard = ({ blog }) => {
  const imageUrl = blog?.thumbnail?.formats?.small?.url
    ? `http://localhost:1337${blog.thumbnail.formats.small.url}`
    : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center";

  return (
    <Link to={`/blogs/${blog.id}`} className="blog-card">
      <div className="blog-card__image-container">
        <img
          src={imageUrl}
          alt={blog.title}
          className="blog-card__image"
          loading="lazy"
        />
        <div className="blog-card__overlay"></div>
      </div>
      <div className="blog-card__content">
        <h3 className="blog-card__title">{blog.title}</h3>
        <p className="blog-card__description">{blog.shortDescription}</p>
      </div>
    </Link>
  );
};

export default BlogCard;