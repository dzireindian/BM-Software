import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from "./Pages/Home";
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter basename='/proadminer'>
      <Switch>
      <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
