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
              {(loggedin == null ? true : false) && <Link to="/signup" id="signupNav">Sign Up</Link>}
              {(loggedin == null ? true : false) && <Link to="/login" id="loginNav">Login</Link>}
              {(loggedin == null ? false : true) && <Link to="/dashboard" id="dashboardNav">Dashboard</Link>}
              {(loggedin == null ? false : true) && <Link to="/account" id="accountNav">Accounts</Link>}
              {(loggedin == null ? false : true) && <Link to="/categories" id="categoryNav">Categories</Link>}
              {(loggedin == null ? false : true) && <Link to="/transaction" id="transactionNav">Transactions</Link>}
              {(loggedin == null ? false : true) && <Link to="/" onClick={(e) => {setLoggedIn(null); localStorage.clear()}} id="logoutNav">Logout</Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavigationBar;
