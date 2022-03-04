import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminState } from "./AdminContext";
import "./App.css";
import HeaderComponent from "./Components/Header/HeaderComponent";
import Login from "./Components/Login";

function App() {
  const { login,setLogin } = AdminState();

  useEffect(() => {
    if(localStorage.getItem("loggedIn")){
      setLogin(localStorage.getItem("loggedIn"));
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="*"
          render={() => (login === "" ? <Login /> : <HeaderComponent />)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
