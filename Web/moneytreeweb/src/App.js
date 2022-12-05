import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import Account from "./components/Account";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import Transaction from "./components/Transaction";
import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import React from "react";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <UserContext.Provider value={{ user, setUser }}>
              <Dashboard />
            </UserContext.Provider>
          }
        />
        <Route
          path="account"
          element={
            <UserContext.Provider value={{ user, setUser }}>
              <Account />
            </UserContext.Provider>
          }
        />
        <Route
          path="categories"
          element={
            <UserContext.Provider value={{ user, setUser }}>
              <Categories />
            </UserContext.Provider>
          }
        />
        <Route
          path="transaction"
          element={
            <UserContext.Provider value={{ user, setUser }}>
              <Transaction />
            </UserContext.Provider>
          }
        />
        <Route
          path="signup"
          element={
              <Signup />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
