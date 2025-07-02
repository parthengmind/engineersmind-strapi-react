// App.jsx (Updated)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogContentRenderer from "./components/BlogContentRenderer";
import Blogs from "./pages/Blogs";
import "./styles/globals.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogContentRenderer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BlogContentRenderer from "./components/BlogContentRenderer";
// import Blogs from "./pages/Blogs";
// import "./App.scss";

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Blogs />} />
//           <Route path="/blogs/:id" element={<BlogContentRenderer />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
