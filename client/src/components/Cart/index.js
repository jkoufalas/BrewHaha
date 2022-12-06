import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector } from "react-redux";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
//import statements

//setup stripe using environment variables
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

//cart
const Cart = () => {
  //setup state with react redux
  const state = useSelector((state) => state);

  //setup checkout query where data comes when requested not on render
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  //setup use effect on the lazy query to handle the query result
  useEffect(() => {
    if (data) {
      //the result is the setup session, use this to submit to stripe
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  //calculates the total of the cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  //method when user clicks to checkout
  function submitCheckout() {
    //this is setting up the variables for the lazy query
    const productIds = [];

    //iterates through the cart and adds the items
    state.cart.forEach((item) => {
      //each item is iterated and each qty is added separately
      // i.e an item with qty 2, gets added twice
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    //submit query with the setup variables
    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <Flex wrap="wrap" align={"center"} w={"full"}>
      {state.cart.length ? (
        /* render only when the cart has anything added to it */
        <Box
          role={"group"}
          p={2}
          w={"full"}
          bg={"white"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          borderColor="gray.200"
        >
          {/* iterate for every item in the cart, add its own component */}
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          {/* calculate total of all items */}
          <Box mt={8}>
            <Text as="b" fontSize="2xl">
              Total: ${calculateTotal()}
            </Text>

            {/* if the user is logged in, then give them checkout button, otherwise give them a button to sign in */}
            {Auth.loggedIn() ? (
              <Button
                rounded={"none"}
                w={"full"}
                size={"lg"}
                py={"7"}
                bg={"gray.900"}
                color={"white"}
                textTransform={"uppercase"}
                onClick={submitCheckout}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                  bg: "gray.700",
                }}
              >
                Checkout
              </Button>
            ) : (
              <Button
                rounded={"none"}
                w={"full"}
                as={"a"}
                href={"/signin"}
                size={"lg"}
                py={"7"}
                bg={"gray.900"}
                color={"white"}
                textTransform={"uppercase"}
                onClick={submitCheckout}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                  bg: "gray.700",
                }}
              >
                Sign-In to Checkout
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        /* if the cart is empty */
        <Text>Your Cart is Empty</Text>
      )}
    </Flex>
  );
};

export default Cart;
