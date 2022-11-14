import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SingleProductItem from "./pages/SingleProductItem";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/products/:id" component={SingleProductItem} />
              <Route exact path="/:category" component={Category} />
              <Route
                exact
                path="/:category/:subCategory"
                element={SubCategory}
              />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/success" element={Success} />
              <Route exact path="/NotFound" element={NotFound} />
              <Route path="*" element={NotFound} />
            </Switch>
          </Router>
        </ChakraProvider>
      </StoreProvider>
    </ApolloProvider>
  );
}
export default App;
