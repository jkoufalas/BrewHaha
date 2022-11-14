import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  async function saveOrder() {
    const cart = await idbPromise("cart", "get");
    const products = cart.map((item) => item._id);
    if (products.length) {
      const { data } = await addOrder({ variables: { products } });
      const productData = data.addOrder.products;

      console.log(data.addOrder.products);

      productData.forEach((item) => {
        idbPromise("cart", "delete", item);
      });
    }

    setTimeout(() => {
      window.location.assign("/");
    }, 3000);
  }

  useEffect(() => {
    console.log("useEffect useEffect useEffect useEffect");
    saveOrder();
  }, []);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, gray.400, gray.600)"
        backgroundClip="text"
      >
        Order Recieved
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Your order has been Placed
      </Text>
      <Text color={"gray.500"} mb={6}>
        You will be contacted shortly with the order detail
      </Text>

      <Button
        colorScheme="gray"
        bgGradient="linear(to-r, gray.400, gray.500, gray.600)"
        color="white"
        variant="solid"
        as={"a"}
        href={"/"}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default Success;
