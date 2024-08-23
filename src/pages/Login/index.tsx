import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-12">
      <div className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 m-2"
        >
          Login with Auth0
        </button>
        <button
          onClick={() => history.push("/register")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 m-2"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
