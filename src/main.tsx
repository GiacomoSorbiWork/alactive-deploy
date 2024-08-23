import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="alactive-dev.uk.auth0.com"
      clientId="09K9jptGf6apeXpCpoKKTRUEjwfW9RsW"
      authorizationParams={{
        // redirect_uri: "http://localhost:5173/",
        redirect_uri: "https://alactive-deploy.vercel.app",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
