import React from "react";
import "./index.css"
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyNavbar = () => {
  
    const navigate = useNavigate()
  const handleLogout = async () => {
    try {
        const response = await axios.post("https://balaramesh8265.pythonanywhere.com/logout"); 
        alert("Logout sucessfully");
        localStorage.removeItem("user_name")
        localStorage.removeItem("user_Id")
        localStorage.removeItem("user_email")
        if (response.status === 200) {
          navigate('/'); 
        }
    } catch (error) {
        console.error("There was an error logging out!", error);
    }
};
  
  return (
    <Navbar expand="lg" className="navContainer bg-primary">
      <Container>
        <Navbar.Brand href="#">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-icon" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link linkInNav custom-nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
