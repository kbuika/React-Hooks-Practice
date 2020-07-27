import React from "react";
import { AuthContext } from "../App";

export const Login = () => {
    const { dispatch } = React.useContext(AuthContext);
    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };
const [data, setData] = React.useState(initialState);
const handleInputChange = event => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    });
};
const handleFormSubmit = event => {
    event.preventDefault();
    setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
    });
    fetch("https://hookedbe.herokuapp.com/api/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"   
        },
        body: JSON.stringify({
            username: data.email,
            password: data.password
        })
    })
    .then (resJson => {
        dispatch({
            type: "LOGIN",
            payload: resJson
        })
    })
    .catch(error => {
        setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText
        });
    });
};

return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
			
    		<label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>
			
    		<label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
			
    		{data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
          
    	  </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

// In the code above, we passed in an initialState object into the useStatehook. In the object we handle the email state, the password state, a state that is used to check if the form is being sent to the server and also an errorMessage value that handles errors from the server.

// Next, we will add a function that handles the form submission to the backend API. In that function, we will use the fetch API to send the payload to the server. If the response is successful, we will dispatch a LOGIN action and also pass the response from the server as a payload in the dispatched action. If there is an error from the server (if the login credentials are not valid), we call setData and pass the errorMessage from the server which will be displayed on the form. In order to call dispatch, we need to import the AuthContext from the App component into our Login component and then use the dispatch function in the app. Your final Login component should look like below: