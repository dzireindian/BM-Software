import React,{useReducer} from "react";

export let Actions = {Register : "register",
Login:"login",
Loggedin:"loggedin",
Logout: "reset"
};

var initialState = {};
export const reducer = (state,action) => {
    switch(action.type){
      case Actions.Logout:
        return initialState
      case Actions.Register:
        return {...state,"register":{email : action.email}}
      case Actions.Login:
        return {...state,"login":{email : action.email}}
      case Actions.Loggedin:
        // window.location = "/user/"+action.loginPayload;
        // action.loginProps.history.push("/user/"+action.loginPayload)
        // history.push('/user'+action.loginPayload);
        // <Redirect to={"/user"+action.loginPayload}/>
        return {...state,"loggedin":action.loginPayload}
      default:
        return state
    }
}

export var userContext = React.createContext();