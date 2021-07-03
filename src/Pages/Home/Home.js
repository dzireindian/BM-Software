import React, { Component } from "react";
import ReactDOM from "react-dom"
import Register from "../../components/Register";
import Login from "../../components/Login";
import './Home.css'

class Home extends Component {

  Signup(active,inactive){
    active.className = "nav-link active";
    inactive.className = "nav-link";
    ReactDOM.render(<Register/>,document.getElementById('card-body'));
  }

  Signin(active,inactive){
    active.className = "nav-link active";
    inactive.className = "nav-link";
    ReactDOM.render(<Login/>,document.getElementById('card-body'));
  }

  render() {

    return (<>
      <div className="homebanner row">

      </div>
        <div className="row">
        <div className="col">
        </div>
        <div className="col">
        <div class="card text-center">
        <div id='userSelection' class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" id="Register" aria-current="true" href="#" onClick={() =>{
                this.Signup(document.getElementById('Register'),document.getElementById('Login'))}}>Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="Login" href="#" 
              onClick={() => {this.Signin(document.getElementById('Login'),document.getElementById('Register'))}}>Login</a>
            </li>
          </ul>
        </div>
        <div id="card-body" class="card-body">
          <Register/>
        </div>
      </div>
      </div>
        </div>
    </>);
  }
}

export default Home;
