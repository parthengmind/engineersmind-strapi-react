import { useEffect, useState } from "react";
import { getAllTeamMembers } from "./api";
import './App.css'

const App = () => {
  const [teamMembers, setTeamMembers] = useState([])

  const fetchAllTeam = async () => {
    await getAllTeamMembers()
      .then((res) => {
        if(res.status === 200){
          setTeamMembers(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

  useEffect(() => {
    fetchAllTeam();
  }, []);

  console.log(teamMembers)

  return <div className="container">
    {teamMembers?.map((item, index) => {
      return (
        <div key={index} className="team-card">
          <img src={`${import.meta.env.VITE_API_URL}${item.profile_img.formats.thumbnail?.url}`} />
          <span className="name">{item.name}</span>
          <span className="designation">{item.designation}</span>
        </div>
      )
    })}
  </div>;
};

export default App;
