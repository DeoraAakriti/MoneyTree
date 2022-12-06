import React, { Component } from "react";
import "../styles/Login.css";
import { createUser } from "../api/UserApi";


class Signup extends Component{
  constructor(){
      super()
      this.state ={          
          userName: '',
          firstName: '',
          lastName: '',          
          password:''
      }
      
      this.changeUsername =this.changeUsername.bind(this)
      this.changeFirstName =this.changeFirstName.bind(this)
      this.changeLastName =this.changeLastName.bind(this)      
      this.changePassword=this.changePassword.bind(this)
      this.onSubmit =this.onSubmit.bind(this)

  }

  changeUsername(event){
    this.setState({
      userName:event.target.value
    })
}
  changeFirstName(event){
      this.setState({
          firstName:event.target.value
      })
  }

  changeLastName(event){
    this.setState({
      lastName:event.target.value
    })
}

  changePassword(event){
      this.setState({
          password:event.target.value
      })
  }

  onSubmit(event){
    
      event.preventDefault()

      const newUser ={
          userName: this.state.userName,
          firstName: this.state.firstName,
          lastName: this.state.lastName,    
          password: this.state.password
      }
        
      createUser(newUser).then(data => {
        this.setState({
          userName:'',
          firstName:'',
          lastName:'',
          password:''
        })
        if(data.status == 400){
          alert("User already exists try Login instead");
        }else{
          alert("Signed up successfully. Please login now");
          window.location.href = "./Login";
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
            <div>
              <h1>Sign Up</h1>

              <div className="second-input">
                <input
                  type="text"
                  placeholder=" Enter Username"
                  name="UserName"
                  onChange={this.changeUsername}
                            value={this.state.userName}
                  className="name"
                  required
                  id="username"
                />
              </div>

              <div className="second-input">
                <input
                  type="text"
                  placeholder=" Enter Firstname"
                  name="FirstName"
                  onChange={this.changeFirstName}
                            value={this.state.firstName}
                  className="name"
                  required
                  id="firstname"
                />
              </div>              

              <div className="second-input">
                <input
                  type="text"
                  placeholder=" Enter Lastname"
                  name="LastName"
                  onChange={this.changeLastName}
                            value={this.state.lastName}
                  className="name"
                  required
                  id="lastname"
                />
              </div>

              <div className="second-input">
                <input
                  type="password"
                  placeholder=" Enter Password"
                  onChange={this.changePassword}
                            value={this.state.password}
                  className="name"
                  required
                  id="password"
                />
              </div>

              <div className="login-button">
                <button
                type="submit"
                value ='Submit'
                onClick={this.onSubmit}
                id="submitform"
                >Sign Up </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
