import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useSelector } from "react-redux";
import { Flex, Spinner, Box, Center } from "@chakra-ui/react";
//import statements

//productlist component, with the two vars of cat and subcat from route
const ProductList = ({ category, subCategory }) => {
  //setup state vars
  const state = useSelector((state) => state);

  //query all products
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  //setup filtered list of products
  const [productList, setProductList] = useState({
    filteredList: [],
  });

  //deconstruct catagories and subCatagories from state
  const { categories, subCategories } = state;

  //check if catagory submitted is in the catagories list
  const catIndex = categories.findIndex(
    (product) => product.link_name === category
  );

  //check if subCatagory submitted is in the subCatagories list
  const subCatIndex = subCategories.findIndex(
    (product) => product.link_name === subCategory
  );

  //useEffect when query returns
  useEffect(() => {
    //if data has returned
    if (!loading && data) {
      //if the subCatagory was found
      if (subCatIndex !== -1) {
        //then the page was sent to a subCat page, therefore filter all products by subCat
        setProductList({
          filteredList: data.products.filter((product) => {
            return (
              product.subCategory.link_name ===
              subCategories[subCatIndex].link_name
            );
          }),
        });
        //if the Catagory was found
      } else if (catIndex !== -1) {
        //then the page was sent to a Catagory page, therefore filter all products by Catagory
        setProductList({
          filteredList: data.products.filter((product) => {
            return (
              product.category.link_name === categories[catIndex].link_name
            );
          }),
        });
      } else {
        //otherwise this is the home page and all products are required
        setProductList({
          filteredList: [...data.products],
        });
      }
    }
  }, [
    data,
    loading,
    catIndex,
    subCatIndex,
    subCategories,
    subCategory,
    category,
    categories,
  ]);

  return (
    <Box border="4px" borderColor="gray.200" m="10" borderRadius="35">
      {/* render filtered items */}
      <Flex wrap="wrap" align={"center"} justify="center">
        {!loading && data ? (
          productList.filteredList.map((product) => (
            <ProductItem
              key={product._id}
              brand={product.brand}
              _id={product._id}
              category={product.categoy}
              subCategory={product.subCategory}
              images={product.images}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              product={product}
            />
          ))
        ) : (
          /* if loading show spinner */
          <Flex
            width={"100vw"}
            height={"100vh"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Center>
              <Box textAlign="center">
                <Spinner color="red.500" size="xl" />
              </Box>
            </Center>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ProductList;
