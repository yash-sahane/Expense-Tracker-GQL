import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./context/StoreContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <ContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ApolloProvider client={client}>
          <App />
          <Toaster />
        </ApolloProvider>
      </ThemeProvider>
    </ContextProvider>
  </Router>
);
