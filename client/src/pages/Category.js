import React from "react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";
//import statements

const Category = () => {
  const { category } = useParams();
  //import params from react rout

  //render sub component with the catagory as a prop
  return <ProductList category={category} />;
};

export default Category;
