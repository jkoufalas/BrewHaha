import React from "react";
import ProductList from "../components/ProductList";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  return <ProductList category={category} />;
};

export default Category;
