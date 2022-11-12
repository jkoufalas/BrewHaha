import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SingleProductItem from "./pages/SingleProductItem";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Success from "./pages/Success";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreProvider from "./utils/GlobalState";

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
      <StoreProvider>
        <ChakraProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<SingleProductItem />} />
              <Route path="/:category" element={<Category />} />
              <Route path="/:category/:subCategory" element={<SubCategory />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </StoreProvider>
    </ApolloProvider>
  );
}
export default App;
