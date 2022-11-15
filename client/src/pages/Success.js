import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
//import statements

//component that handles return from stripe
function Success() {
  //setup mutation to add order to user
  const [addOrder] = useMutation(ADD_ORDER);

  //useEffect to render only on initial render of page
  useEffect(() => {
    async function saveOrder() {
      //gets items from cart from browser database
      const cart = await idbPromise("cart", "get");

      //sets up mutatipn data
      const products = cart.map((item) => item._id);
      const quantity = cart.map((item) => item.purchaseQuantity);

      //if there is products in the cart
      if (products.length) {
        //mutate with products and quantity data
        const { data } = await addOrder({ variables: { products, quantity } });
        //get data from order returned from mutation
        const productData = data.addOrder.products;

        //use mutation data order to delet items from cart on browser
        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      //use timer before redirecting to home page
      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    /* simple page to tell the user that the ttansaction was a success */
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
        You will be contacted shortly with the order details
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
