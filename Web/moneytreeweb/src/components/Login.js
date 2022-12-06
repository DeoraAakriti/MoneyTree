import "../styles/Login.css";
import profile from "../images/LoginIcon.png";
import email from "../images/email.jpg";
import pass from "../images/pass.png";
import React, { Component } from "react";
import { getUserByuserName } from "../api/UserApi";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const user ={
      userName: this.state.userName,         
      password: this.state.password
  }    


  getUserByuserName(user).then((data) => {
      this.setState({
        userName:'',
        password:''
      }) 
      if(data == undefined){
        alert("Please check the username or password entered.");
      }else{
        localStorage.setItem('userid', data.Id)
        window.location.href = "./Dashboard";
      }
    })
  }
  

  render() {  
    return (
      <div className="main" style={{
        marginTop: "3%",
      }}>
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <div>
              <h1>Login</h1>              
              <div>
                <img src={email} alt="email" className="email" />
                <input
                  type="text"
                  placeholder="Enter username"
                  className="name"                  
                  autoComplete="off"
                  onChange={(e) => this.setState({ userName: e.target.value })}                 
                  required
                  id="username"
                />
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="name"
                  onChange={(e) => this.setState({ password: e.target.value })}                  
                  required
                  id="password"
                />
              </div>
              <div className="login-button">
                <button onClick={this.handleSubmit} id="submitform">Login </button>
              </div>            
            </div>
          </div>
        </div>
      </div>
    );

}}

