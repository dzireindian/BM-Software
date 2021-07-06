import React, { useContext } from "react";
import ReactDom from "react-dom";
import {userContext} from "../../App"
import firedb from "../../firebase";
function Signin() {
  const mail = document.getElementById('logEmail');
  const log = document.getElementById('log-register');
  const pwrd = document.getElementById('logPassword');
  ReactDom.render(<><><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
    </div><div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div><div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div></></>,log);
  try{
  firedb.collection('users').doc(mail.value).get().then((snapshot)=>{
      var valid = false;
      if(snapshot.exists == false){
        log.innerHTML = "Email not registered"
      }else{
        let data = snapshot.data();
        console.log("data upon fetching");
        console.log(data);
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.REACT_APP_HASH_KEY);
        let password = cryptr.decrypt(data['password']);
        console.log("retrieved password = ",cryptr.decrypt(data['password']),"typed password =",pwrd.value);
        console.log("check condition",(password !== pwrd.value));
        if(password !== pwrd.value){
          pwrd.innerHTML = "Incorrect password"
        }else{
          valid = true;
        }
      }

      if(valid === true){
        console.log("logged in")
      }
  });
}catch(e){
  log.innerHTML = "Poor Internet Connection"
}

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
