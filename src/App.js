import {BrowserRouter,Redirect,Route,Switch} from "react-router-dom";
// import {useHistory} from "react-router-dom";
import React,{useReducer} from "react";
import Home from "./Pages/Home";
import UserDashBoard from "./Pages/userDashBoard"
import './App.css';

import {userContext,reducer,Actions} from "./utils/contextProvider"

function App() {
  // history = useHistory();
  // console.log('history =',history)
  let [userstate,dispatch] = useReducer(reducer,{});
  return (
    <div className="App">
    <userContext.Provider value={{userstate,dispatch,Actions}}>
    <BrowserRouter>
        <Switch>
        <Route exact path="/">
          {userstate.hasOwnProperty(Actions.Loggedin)?(<Redirect to="/user"></Redirect>) : <Home/>}
        </Route>
        <Route exact path="/user">
        {userstate.hasOwnProperty(Actions.Loggedin)?<UserDashBoard/> : (<Redirect to="/"></Redirect>)}
        </Route>
        </Switch>
    </BrowserRouter>
    </userContext.Provider>
    </div>
  );
}

export default App;
