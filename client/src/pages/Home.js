import React from "react";
import ProductList from "../components/ProductList";
import { Flex, Image } from "@chakra-ui/react";

//import statements

const Home = () => {
  //render product list with no props
  return (
    <>
      <Flex
        w={"full"}
        h={{ base: "45vh", md: "60vh", lg: "80vh" }}
        backgroundImage={"/Images/machine-wide.png"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      ></Flex>
      <Flex
        wrap="wrap"
        align={"center"}
        justify="center"
        p={"5"}
        border="4px"
        borderColor="gray.200"
        m="10"
        borderRadius="35"
      >
        <Image height={28} src={"/Images/Logo.png"} />
      </Flex>
      <ProductList />
    </>
  );
};

export default Home;
