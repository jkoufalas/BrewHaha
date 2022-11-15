import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Spinner,
  Center,
  Container,
} from "@chakra-ui/react";
import React from "react";
import OrderList from "../components/OrderList";
import { Navigate } from "react-router-dom";

//import useMutation from the apollo clien API
import { useQuery } from "@apollo/client";
//import the ADD_USER mutation from utilities
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

//orders component
export default function Orders() {
  //query a user
  const { loading, data } = useQuery(QUERY_USER);

  //calculate the total of an order
  function calculateTotal(items) {
    let sum = 0;
    for (let index = 0; index < items.products.length; index++) {
      sum += items.products[index].price * items.quantity[index];
    }

    return sum.toFixed(2);
  }

  //setup currency formatting options
  let formatting_options = {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 3,
  };
  let dollarString = new Intl.NumberFormat("en-US", formatting_options);

  //if the user isn't logged in then send them to the login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/signin" />;
  }

  return (
    <Container maxW={"7xl"} w={"full"}>
      {/* render the data when it comes */}
      {!loading && data.user.orders.product !== null ? (
        /* setup the orders page */
        <Flex
          minH={"100vh"}
          /* align={"center"} */
          justify={"center"}
          bg={"gray.50"}
          w={"full"}
          minW={"full"}
        >
          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
            w={"full"}
            minW={"full"}
          >
            <Stack align={"center"} w={"full"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Orders
              </Heading>
            </Stack>
            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8} w={"full"}>
              {/* iterate through every order for user */}
              {data.user.orders.map((item) => (
                <Stack align={"center"} w={"full"} key={`box${item._id}`}>
                  {/* list order elements */}
                  <OrderList orders={item} />
                  {/* calculate order total */}
                  <Text as="b" key={item._id}>
                    Total:{" "}
                    {dollarString.format(
                      calculateTotal(item).toString(),
                      formatting_options
                    )}
                  </Text>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Flex>
      ) : (
        /* render spinner until order info has returned */
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
    </Container>
  );
}
