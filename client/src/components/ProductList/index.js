import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useSelector } from "react-redux";
import { Flex, Spinner, Box, Center } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";

const ProductList = ({ category, subCategory }) => {
  const state = useSelector((state) => state);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [productList, setProductList] = useState({
    filteredList: [],
  });

  const { categories, subCategories } = state;

  const catIndex = categories.findIndex(
    (product) => product.link_name === category
  );
  const subCatIndex = subCategories.findIndex(
    (product) => product.link_name === subCategory
  );

  useEffect(() => {
    if (!loading && data) {
      if (subCatIndex !== -1) {
        setProductList({
          filteredList: data.products.filter((product) => {
            return (
              product.subCategory.link_name ===
              subCategories[subCatIndex].link_name
            );
          }),
        });
      } else if (catIndex !== -1) {
        setProductList({
          filteredList: data.products.filter((product) => {
            return (
              product.category.link_name === categories[catIndex].link_name
            );
          }),
        });
      } else {
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

  if (!loading && category && catIndex) {
    return <Redirect to="/NotFound" />;
  }
  if (!loading && subCategory && subCatIndex) {
    return <Redirect to="/NotFound" />;
  }

  return (
    <div>
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
    </div>
  );
};

export default ProductList;
