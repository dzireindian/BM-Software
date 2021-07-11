import React, {useState,useContext} from "react";
import {Redirect} from "react-router-dom";
import Register from "../../components/Register";
import {userContext} from "../../utils/contextProvider";
import Login from "../../components/Login";
import './Home.css';

  function Home(props) {
    let user = useContext(userContext);
    let [login,setLogin] = useState(false);

    console.log("context before logging in ");
    console.log(user);

    let logdata = user.userstate
    if(logdata.hasOwnProperty(user.Actions.Loggedin)){
      props.history.push("/user")
      // return (<Redirect to="/user"></Redirect>)
    }

    var body = login?(<Login/>):(<Register/>);
    let logTab = login?"nav-link active":"nav-link";
    let regTab = login?"nav-link":"nav-link active";
    

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
                  <a className={regTab} id="Register" aria-current="true" href="#" onClick={() =>{
                    setLogin(false)}}>Register</a>
                </li>
                <li class="nav-item">
                  <a className={logTab} id="Login" href="#" 
                  onClick={() => { setLogin(true) }}>Login</a>
                </li>
              </ul>
            </div>
            <div id="card-body" class="card-body">
            {body}
            </div>
          </div>
      </div>
        </div>
    </>);
  }

export default Home;
