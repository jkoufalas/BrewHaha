import React from "react";
import ProductList from "../components/ProductList";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const { catagory, subCatagory } = useParams();

  return <ProductList catagory={catagory} subCatagory={subCatagory} />;
};

export default Home;
