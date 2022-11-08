import React from "react";
import ProductItem from "../ProductItem";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  try {
    if (!loading) {
      //console.log(data);
    }
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <Flex wrap="wrap" align={"center"} justify="center">
        {loading
          ? console.log("loading")
          : data.products.map((product) => (
              <ProductItem
                key={product._id}
                brand={product.brand}
                _id={product._id}
                images={product.images}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
        {/* <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem /> */}
      </Flex>
    </div>
  );
};

export default Home;
