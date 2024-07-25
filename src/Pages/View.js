import React, { useEffect, useState } from 'react';
import MyNavbar from './Navebar/MyNavbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const navigate = useNavigate();
  const [Userdata, setUserData] = useState({ a_page: [] });
  const [isLoader, setIsLoader] = useState(true);
  const user_Id = localStorage.getItem("user_Id");
  const user_name = localStorage.getItem("user_name");
  const user_group = localStorage.getItem("user_group");

  const getUserData = async () => {
    if (!user_Id) {
      alert("User not valid");
      setIsLoader(false); 
      return;
    }
    try {
      const response = await axios.get(`https://balaramesh8265.pythonanywhere.com/getUsersData/${user_Id}`);
      setUserData(response.data);
      setIsLoader(false); 
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
      setIsLoader(false); 
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <MyNavbar />
      <center>
        <h1>{user_name} Yours Group {user_group}. Your access to the page given below</h1>
        {/* {JSON.stringify(Userdata)} */}
      </center>
      {isLoader ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          {Userdata.a_page && Userdata.a_page.length > 0 ? (
            Userdata.a_page.map((e, i) => (
              <Card key={i} style={{ width: '18rem' }} onClick={() => navigate(`/${e}`)}>
                <Card.Body>
                  <Card.Title>{e}</Card.Title>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>No pages available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default View;
