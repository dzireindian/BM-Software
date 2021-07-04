import {BrowserRouter,Route,Switch} from "react-router-dom";
import React,{useReducer} from "react";
import Home from "./Pages/Home";
import './App.css';

export var userContext = React.createContext();

var initialState = {};
const reducer = (state,action) => {
    switch(action.type){
      case "reset":
        return initialState
      default:
        return state
    }
}

function App() {
  let [userstate,dispatch] = useReducer(reducer,initialState);
  return (
    <div className="App">
    <userContext.Provider value={{userState:userstate,Dispatch:dispatch}}>
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
