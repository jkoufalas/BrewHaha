import React from "react";
import ProductItem from "../ProductItem";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Flex wrap="wrap" align={"center"} justify="center">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </Flex>
    </div>
  );
};

export default Home;
