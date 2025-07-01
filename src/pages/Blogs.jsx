import React, { useEffect, useState } from 'react'
import { getListOfAllBlogs } from '../api';
import './blogs.scss';                           
import { Link } from "react-router-dom";


const Blogs = () => {

    const [listOfAllBlog, setListOfAllBlog] = useState([]);

    const fetchListOfAllBlog = async () => {
        try {
            const res = await getListOfAllBlogs();
            if (res.status === 200) {
                setListOfAllBlog(res.data.data);
            }
        } catch (e) {
            console.error("Error in fetchAllBlog:", e);
        }
    };

    useEffect(() => {
        fetchListOfAllBlog();
    }, []);

    return (
        <div className="blogs-wrapper">
            <h1 className="blogs-title">Blogs</h1>
            <div className="blog-grid">
                {listOfAllBlog.map((blog) => (
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} key={blog.id} to={`/blogs/${blog.id}`} className="blog-card">
                        <img
                            className="blog-thumbnail"
                            src={`http://localhost:1337${blog.thumbnail.formats.small.url}`}
                            alt={blog.thumbnail?.name || blog.title}
                        />
                        <div className="blog-content">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-description">{blog.shortDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default Blogs