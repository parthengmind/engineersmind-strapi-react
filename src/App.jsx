import { useEffect, useState } from "react";
import { getAllBlogs, getAllTeamMembers } from "./api";
import "./App.css";
import BlogContentRenderer from "./components/BlogContentRenderer";

const App = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [blog, setBlog] = useState([]);

  // const fetchAllTeam = async () => {
  //   await getAllTeamMembers()
  //     .then((res) => {
  //       if(res.status === 200){
  //         setTeamMembers(res.data.data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // };

  // const fetchAllBlog = async () => {
  //   await getAllBlogs()
  //     .then((res) => {
  //       if(res.status === 200) {
  //         setBlog(res.data.data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // };

  const fetchAllBlog = async () => {
    try {
      const res = await getAllBlogs();
      if (res.status === 200) {
        setBlog(res.data?.data?.[0]?.blogContent);
      }
    } catch (e) {
      console.error("Error in fetchAllBlog:", e);
    }
  };

  useEffect(() => {
    // fetchAllTeam();
    fetchAllBlog();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <BlogContentRenderer blogContent={blog} />
    </div>
  );
};

export default App;
