import {BrowserRouter,Route,Switch} from "react-router-dom";
import React,{useReducer} from "react";
import Home from "./Pages/Home";
import './App.css';

export var userContext = React.createContext();

let Actions = {Register : "register",
Login:"login",
Logout: "reset"
};

var initialState = {};
const reducer = (state,action) => {
    switch(action.type){
      case Actions.Logout:
        return initialState
      case Actions.Register:
        return {...state,"register":{email : action.email}}
      case Actions.Login:
        return {...state,"login":{email : action.email}}
      default:
        return state
    }
}

function App() {
  let [userstate,dispatch] = useReducer(reducer,initialState);
  return (
    <div className="App">
    <userContext.Provider value={{userstate,dispatch,Actions}}>
    <BrowserRouter basename='/proadminer'>
      <Switch>
      <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
    </userContext.Provider>
    </div>
  );
}

export default App;
