import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login with Auth0
        </button>
      </div>
    </div>
  );
};

export default Login;
