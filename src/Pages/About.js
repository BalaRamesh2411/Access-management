import React, { useEffect, useState } from 'react';
import MyNavbar from './Navebar/MyNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ a_page: '' });
  const user_Id = localStorage.getItem("user_Id");
  const user_group = localStorage.getItem("user_group");

  const getUserData = async () => {
    if (!user_Id || user_group !== "A") {
      navigate("/notfound");
      return;
    }

    try {
      const response = await axios.get(`https://balaramesh8265.pythonanywhere.com/groupA/About/${user_Id}`);
      setUserData(response.data);
      if (!response.data.user_id) { 
        navigate("/notfound");
      }
      console.log("replay", response.data);
    } catch (error) {
      console.error(error);
      navigate("/notfound");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <MyNavbar />
      <h1>About our company</h1>
    </div>
  );
};

export default About;
