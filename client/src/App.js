import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SingleProductItem from "./pages/SingleProductItem";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<SingleProductItem />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
