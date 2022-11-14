import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Button, Text } from "@chakra-ui/react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  /* function submitCheckoutNav() {

  } */

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <Flex wrap="wrap" align={"center"} w={"full"}>
      {state.cart.length ? (
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
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <Box mt={8}>
            <Text as="b" fontSize="2xl">
              Total: ${calculateTotal()}
            </Text>

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
                SignIn to Checkout
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </Flex>
  );
};

export default Cart;
