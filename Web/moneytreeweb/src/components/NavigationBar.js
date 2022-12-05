import React from "react";
import moneytree from "../images/moneytree.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavigationBar = () => {
  const [loggedin, setLoggedIn] = useState(null);
  useEffect(()=>{
    setLoggedIn(localStorage.getItem("userid"));
  }, [])
  
  return (
    <div>
      <Container>
        <Navbar style={{ backgroundColor: "#D3F5D3" }} expand="lg" fixed="top">
          <img src={moneytree} width="100" height="100" alt="Money Tree logo" />

          <Navbar.Brand style={{ fontSize: "250%", paddingLeft: "2%" }}>
            Money Tree
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/" >Home</Link>
              {(loggedin == null ? true : false) && <Link to="/signup">Sign Up</Link>}
              {(loggedin == null ? true : false) && <Link to="/login">Login</Link>}
              {(loggedin == null ? false : true) && <Link to="/dashboard">Dashboard</Link>}
              {(loggedin == null ? false : true) && <Link to="/account">Accounts</Link>}
              {(loggedin == null ? false : true) && <Link to="/categories">Categories</Link>}
              {(loggedin == null ? false : true) && <Link to="/transaction">Transactions</Link>}
              {(loggedin == null ? false : true) && <Link to="/" onClick={(e) => {setLoggedIn(null); localStorage.clear()}}>Logout</Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavigationBar;
