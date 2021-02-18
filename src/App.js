import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { Reducer, initialState } from "./Reducers/UserReducer"
import Signup from "./Pages/Signup/Signup"
import Login from "./Pages/Login/Login"
import Home from "./components/Home/Home"

export const userContext = React.createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = React.useContext(userContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      console.log(state)
      dispatch({ type: "USER", payload: user })
    } else {
      history.push("/login")
    }
  }, [])

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

function App() {
  const [state, dispatch] = React.useReducer(Reducer, initialState)
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </userContext.Provider>
    </>
  );
}


export default App;
