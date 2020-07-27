import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

// The above snippet is our initial state object that will be used in our reducer. The values in this object depend mainly on your use case. In our case we need to check if a user is authenticated, contains the user data, and if a token was sent back from the server after login.

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state;
  }
};

// The reducer function contains a case-switch statement that, based on certain actions, returns a new state. The actions in the reducer are:

// LOGIN — When this type of action is dispatched, it will also be dispatched with a payload (containing user and token ). It saves the user and token to localStorage and then returns a new state, setting isAuthenticated to true, and also sets the user and token keys to their respective values based on the action’s payload.
// LOGOUT — When this action is dispatched, we clear localStorage of all data and set user and token to null .
// If no action is dispatched, it returns the initial state.


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // The useReducer hook  returns two parameters, state and dispatch . state contains the state that is used in the component and it is updated based on the actions dispatched. Dispatch is a function that is used in the application to call/dispatch actions that transform or change the state.
return (
  <AuthContext.Provider
    value={{
      state,
      dispatch
    }}
  >
    <Header />
  <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
  </AuthContext.Provider>
  );
}
export default App;


// In the App.js file, we will create the Auth context that will pass the auth state from this component to any other component that requires it. Create an authentication context like this



// Then we add the useReducer hook to handle our authentication state, and conditionally render either the Login component or the Home component.
