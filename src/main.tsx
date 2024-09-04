import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./global.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
  palette: {
    primary: {
      main: "#9e80f3",
    },
    secondary: {
      main: "#717070",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

const ApolloProviderWithAuth0 = ({ children }: { children: React.ReactNode }) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: import.meta.env.VITE_CALLBACK_URL,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE
        }}
      >
        <ApolloProviderWithAuth0>
          <App />
        </ApolloProviderWithAuth0>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);
