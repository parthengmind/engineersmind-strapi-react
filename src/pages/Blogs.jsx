import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListOfAllBlogs } from '../api';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import '../styles/Blogs.scss';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const Blogs = () => {
  const [listOfAllBlog, setListOfAllBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListOfAllBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getListOfAllBlogs();
      if (res.status === 200) {
        setListOfAllBlog(res.data.data);
      }
    } catch (e) {
      console.error("Error in fetchAllBlog:", e);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListOfAllBlog();
  }, []);

  return (
    <>
      <Header />
      <main className="blogs-wrapper">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt; <Link to="/">Resources</Link> &gt; Blogs
          </nav>
          
          <div className="blogs-header">
            <h1 className="blogs-title">Blogs</h1>
          </div>
          
          {loading ? (
            <div className="loading">Loading blogs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="blog-grid">
              {listOfAllBlog?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Blogs;


