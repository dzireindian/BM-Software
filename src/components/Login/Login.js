import React, { useContext } from "react";
import {userContext} from "../../App"
import firedb from "../../firebase";
function Signin() {
  const mail = document.getElementById('logEmail');
  var query = firedb.collection('users').where('email', '==', mail.value).get();
  console.log(query.empty);

}

var Login = (props) =>{
  let user = useContext(userContext);
  console.log(user)

  return (
    <form class="needs-validation">
    <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="logEmail"></input>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="logPassword"></input>
    </div>
  </div>

  <div class="mb-3 row">
  <p id="log-register" className="text-danger"></p>
  </div>

  <button type="button" class="btn btn-info" onClick={Signin}>Sign In</button>
    </form>);
  
}

export default Login;
