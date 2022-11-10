import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SingleProductItem from "./pages/SingleProductItem";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
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

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<SingleProductItem />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}
export default App;
