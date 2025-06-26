// import { useEffect, useState } from "react";
// import { getAllBlogs, getAllTeamMembers } from "./api";
// import "./App.css";
// import BlogContentRenderer from "./components/BlogContentRenderer";
// import Blogs from "./pages/Blogs";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const App = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [blog, setBlog] = useState([]);

//   // const fetchAllTeam = async () => {
//   //   await getAllTeamMembers()
//   //     .then((res) => {
//   //       if(res.status === 200){
//   //         setTeamMembers(res.data.data);
//   //       }
//   //     })
//   //     .catch((e) => {
//   //       console.log(e);
//   //     })
//   // };

//   // const fetchAllBlog = async () => {
//   //   await getAllBlogs()
//   //     .then((res) => {
//   //       if(res.status === 200) {
//   //         setBlog(res.data.data);
//   //       }
//   //     })
//   //     .catch((e) => {
//   //       console.log(e);
//   //     })
//   // };

//   const fetchAllBlog = async () => {
//     try {
//       const res = await getAllBlogs();
//       if (res.status === 200) {
//         console.log("all blog ===>",res.data?.data);
//         setBlog(res.data?.data?.[0]?.blogContent);
//       }
//     } catch (e) {
//       console.error("Error in fetchAllBlog:", e);
//     }
//   };

//   useEffect(() => {
//     // fetchAllTeam();
//     fetchAllBlog();
//   }, []);

//   return (
//     <div className="container mx-auto py-8">
//       <Blogs />
//       <BlogContentRenderer blogContent={blog} />
//     </div>
//   );
// };

// export default App;




import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { getAllBlogs, getAllTeamMembers } from "./api";
import BlogContentRenderer from "./components/BlogContentRenderer";
import Blogs from "./pages/Blogs";
import "./App.css";

const App = () => {
  // const [blog, setBlog] = useState([]);

  // const fetchAllBlog = async () => {
  //   try {
  //     const res = await getAllBlogs();
  //     if (res.status === 200) {
  //       setBlog(res.data?.data); // all blogs
  //     }
  //   } catch (e) {
  //     console.error("Error in fetchAllBlog:", e);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllBlog();
  // }, []);

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
