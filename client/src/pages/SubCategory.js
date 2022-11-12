import React from "react";
import ProductList from "../components/ProductList";
import { Link, useParams } from "react-router-dom";

const SubCategory = () => {
  const { category, subCategory } = useParams();

  return <ProductList category={category} subCategory={subCategory} />;
};

export default SubCategory;
