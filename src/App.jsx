import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { getAllBlogs, getAllTeamMembers } from "./api";
import BlogContentRenderer from "./components/BlogContentRenderer";
import Blogs from "./pages/Blogs";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogContentRenderer />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
