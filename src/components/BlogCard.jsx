import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blogs.scss';

const BlogCard = ({ blog }) => {
const imageUrl = blog?.thumbnail?.formats?.small?.url
  ? `${import.meta.env.VITE_API_URL}${blog.thumbnail.formats.small.url}`
  // ? `https://emstrapi-website.engineersmind.dev${blog.thumbnail.formats.small.url}`
  : null;
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