import React,{useRef,useContext,useState} from "react";
import ReactDom from "react-dom";
import {userContext} from "../../App"
import firedb from "../../firebase"

var valid = true;
// let userstate,dispatch;
let user,info,setInfo;

function emailValidation()
{
  let infoRef = document.getElementById('form-info');
  infoRef.innerHTML = '';
  var mail = document.getElementById('Email').value;
  let cmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  user.dispatch({type:user.Actions.Register,email: mail});
  console.log(user);
        if(mail === ""){
          document.getElementById('email-log').innerHTML = "Email cannot be empty";
          valid = false;
        }
        else if (!cmail.test(mail)) {
          // console.log(mail);
          // alert(mail)
          document.getElementById('email-log').innerHTML = "Enter a valid email";
          valid = false;
        }
        else {
          document.getElementById('email-log').innerHTML = "";
          valid = true;
        }
}

function passwordValidation(){
  var pwrd  = document.getElementById('Password').value;
  if(pwrd === ""){
    document.getElementById('password-log').innerHTML = "Password cannot be empty";
    valid = false;
  }
  else if (pwrd.match(/[a-z]/g) && pwrd.match(/[A-Z]/g) && pwrd.match(/[0-9]/g) && pwrd.match(/[^a-zA-Z\d]/g) && pwrd.length >= 6)
      {
        document.getElementById('password-log').innerHTML = "";
        valid = true;
      }
      else
      {
        document.getElementById("password-log").innerHTML = "Password should contain atleast one [A-Z],[a-z],[1-0],special characters.";
        valid = false;
      }

}

function cpasswordalidation(){
  let infoRef = document.getElementById('form-info');
  infoRef.innerHTML = '';
  var pwrd  = document.getElementById('Password');
  var cpwrd = document.getElementById('Cpassword');
  var cpwrdLog = document.getElementById("cpassword-log");

  if(cpwrd.value === ""){
    cpwrdLog.innerHTML = "confirmation password cannot be empty";
    valid = false;
  }else if(pwrd.value !== cpwrd.value){
        cpwrdLog.innerHTML = "Confirmation password does not match with entered password";
        valid = false;
  }else{
        cpwrdLog.innerHTML = "";
        valid = true;
      }

}

async function Signup(){

  const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.REACT_APP_HASH_KEY);

    var email = document.getElementById('Email');
    var password = document.getElementById('Password');
    var cpassword = document.getElementById('Cpassword');

    password = cryptr.encrypt(password.value);

    var payload = {"email":email.value,"password":password,"organizations":[],"tasks:":[]};
    console.log(payload);

    await firedb.collection("users").doc(email.value).set(payload)
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });

}

let OTP = (props) => {
  let otpRef = useRef(null);
  let infoRef = document.getElementById('form-info');
  infoRef.innerHTML = "";
  console.log("otp =",props.otp);
  return (<>
    <input onChange={ ()=> {
      console.log("input ref =",otpRef.current.value !== props.otp);
      if(otpRef.current.value === ""){
        infoRef.innerHTML = "otp can not be empty";
        valid = false;
      }
      else if(otpRef.current.value !== props.otp){
        infoRef.innerHTML = "Incorrect otp";
        valid = false;
      }
      else{
        infoRef.innerHTML = "";
        valid = true;
      }
    }} ref={otpRef} id="otp" type="text" class="form-control" placeholder="Enter otp sent to your mail" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
<button id="otpverify" class="btn btn-outline-secondary" type="button" id="button-addon2" 
onClick={() => {
  if(valid === true){
    Signup()
  }
}}>verify</button></>);

}

async function userCheck(props){
    setInfo(<><div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
  </div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
  </div></>);
  // const userRef = firedb.collection('users');

  try{
    await firedb.collection('users').doc(props.email.value).get().then((snapshot)=>{
      // snapshot = snapshot.get();
      console.log(snapshot.exists);
      if (snapshot.exists) {
        setInfo("User already exists")
      }else{
          props.email.disabled = true;
          props.pwrd.disabled = true;
          props.cpwrd.disabled = true;
          props.regBtn.disabled = true;
        let randint = 100000 + Math.random() * (999999 - 100000);
        randint = randint.toString();
        
        ReactDom.render(<OTP otp={randint}></OTP>,document.getElementById('otpblock'));
      }
    });
    
  } catch(e) {
    setInfo("Poor Internet Connection");
    console.log("error =",e)
  }

}

var Register = (props) =>{

  // console.log(useContext(userContext))
  user = useContext(userContext);
  [info,setInfo] = useState("");
  // console.log(user);
  let val = user.userstate.hasOwnProperty(user.Actions.Register)?user.userstate[user.Actions.Register]['email']:"";
  // console.log("in register");
  // console.log(user.userstate)
  return (
    <form class="needs-validation">
    <p id="form-info" className="text-center text-danger">{info}</p>
    <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="Email" value={val} onChange={emailValidation}></input>
    </div>
  </div>
  <div class="mb-3 row">
  <p id="email-log" className="text-danger"></p>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="Password" onChange={passwordValidation}></input>
    </div>
  </div>

  <div class="mb-3 row">
  <p id="password-log" className="text-danger"></p>
  </div>

  <div class="mb-3 row">
  <label for="inputPassword" class="col-sm-2 col-form-label">Confirm Password</label>
  <div class="col-sm-10">
    <input type="password" class="form-control" id="Cpassword" onChange={cpasswordalidation}></input>
  </div>
  </div>
  <div class="mb-3 row">
  <p id="cpassword-log" className="text-danger"></p>
  </div>
  <div id="otpblock" class="input-group mb-3">
  
  </div>
  <button type="button" id="regBtn" class="btn btn-info" onClick={
  ()=>{
    let infoRef = document.getElementById('form-info');
    let email = document.getElementById('Email');
    let pwrd = document.getElementById('Password');
    let cpwrd = document.getElementById('Cpassword');
    let regBtn = document.getElementById('regBtn');

    if(email.value==="" | pwrd.value==="" | cpwrd.value===""){
      infoRef.innerHTML = "input fields cannot be empty"
      valid = false;
      return;
    }
    else if(valid === false){
      infoRef.innerHTML = 'Invalid input entries';
      return;
    }

    if(valid === true){
      userCheck({infoRef,email,pwrd,cpwrd,regBtn});
    }
  }
  }>Register</button>
    </form>);
  
}

export default Register;
