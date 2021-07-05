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
  console.log(user.userstate.hasOwnProperty(user.Actions.Login));
  let email = user.userstate.hasOwnProperty(user.Actions.Login)?user.userstate[user.Actions.Login]['email']:"";
  return (
    <form class="needs-validation">
    <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input onChange={()=>{
        // console.log(event);
        let key = user.userstate.Login;
        // console.log(event.target.value);
        user.dispatch({type:user.Actions.Login,"email":document.getElementById('logEmail').value})
        console.log(user);
      }} type="text" class="form-control" value={email} id="logEmail"></input>
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
