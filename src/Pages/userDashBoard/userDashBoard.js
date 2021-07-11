import React, { useReducer,useRef,useContext} from "react";
import {userContext} from "../../utils/contextProvider"
import {Dencrypter} from "../../utils/Dencrypter"
import Organizations from "../../components/Organizations"


let user;
function reducer(state,action){
  switch(action){
    default:
      return <Organizations/>
  }

}

function Validate(props){
  try{
    if(props.match.token !== undefined){
      var data = Dencrypter.jwtDecrypt(props.match.token)
      console.log(data);
      if(data.hasOwnProperty('email')){
        user.dispatch({type:user.Actions.Loggedin,loginPayload:data})
      }else{
        throw "invalid token received"
      }
    }
  }catch(e){
    props.history.push('/');
  }
}

function UserDashBoard(props){
  user = useContext(userContext);
  console.log("context after logging in");
  console.log(user);

  // Validate(props);

  let [menu,setMenu] = useReducer(reducer,"");
  let adder = useRef(null);
  let organizations = (user.userstate.loggedin.organizations.length!==0)?user.userstate.loggedin.organizations.map((org)=>{
    return org.type==="admin"?(<button className="btn btn-lg btn-success">{org.name}</button>):(<button className="btn btn-lg btn-primary">org.name</button>)
  }):"";
  return(<><nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className="row">
    <div className="col">
    <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Organizations
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="input-group mb-3">
          <input ref={adder} type="text" class="form-control" placeholder="Add Organization" aria-describedby="button-addon2"/>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>        
        {organizations}
      </div>
    </div>
  </div>
    </div>
    <div className="col">
    {menu}
    </div>
</div>
</>);
}

export default UserDashBoard;
