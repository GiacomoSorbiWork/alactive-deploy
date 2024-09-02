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

const ApolloProviderWithAuth0: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: "https://v1.api.alactive.app/graphql",
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
        domain="alactive-dev.uk.auth0.com"
        clientId="09K9jptGf6apeXpCpoKKTRUEjwfW9RsW"
        authorizationParams={{
          // redirect_uri: "http://localhost:5173/",
          audience: "http://v1.api.alactive.app/graphql",
          redirect_uri: "https://alactive-deploy.vercel.app",
        }}
      >
        <ApolloProviderWithAuth0>
          <App />
        </ApolloProviderWithAuth0>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);
