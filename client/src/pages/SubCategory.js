import React from "react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";

const SubCategory = () => {
  const { category, subCategory } = useParams();
  //get params from reac route

  //render product list and give catagory and subCatagory as props
  return <ProductList category={category} subCategory={subCategory} />;
};

export default SubCategory;
