import React,{useEffect,useRef,useState} from "react";
import ReactDom from "react-dom";
import firedb from "../../firebase"

var valid = true;

function emailValidation()
{
  var mail = document.getElementById('Email').value;
  let cmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(mail === ""){
          document.getElementById('email-log').innerHTML = "Enter a valid email";
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
    document.getElementById('email-log').innerHTML = "Enter a valid email";
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

  var pwrd  = document.getElementById('Password');
  var cpwrd = document.getElementById('Cpassword');
  var cpwrdLog = document.getElementById("cpassword-log");

  if(cpwrd.value === ""){
    document.getElementById('email-log').innerHTML = "Enter a valid email";
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

  return (<>
    <input ref={otpRef} id="otp" type="text" class="form-control" placeholder="Enter otp sent to your mail" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
<button id="otpverify" class="btn btn-outline-secondary" type="button" id="button-addon2" 
onClick={() => {
  if(otpRef.current.value !== props.otp){
    alert('Incorrect otp')
  }else{
    Signup()
  }
}}>verify</button></>);

}

var Register = (props) =>{

  return (
    <form class="needs-validation">
    <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="Email" onChange={emailValidation}></input>
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
  <button type="button" class="btn btn-info" onClick={
  ()=>{
    document.getElementById('Email').disabled = true;
    document.getElementById('Password').disabled = true;
    document.getElementById('Cpassword').disabled = true;
    let randint = 100000 + Math.random() * (999999 - 100000);
    randint = randint.toString();
    ReactDom.render(<OTP otp={randint}></OTP>,document.getElementById('otpblock'));
  }
  }>Register</button>
    </form>);
  
}

export default Register;
