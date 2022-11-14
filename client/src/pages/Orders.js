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

export default function Orders() {
  const { loading, data } = useQuery(QUERY_USER);

  function calculateTotal(items) {
    let sum = 0;
    console.log(items);
    for (let index = 0; index < items.products.length; index++) {
      console.log(items.products[index].price);
      console.log(items.quantity[index]);
      sum += items.products[index].price * items.quantity[index];
    }

    return sum.toFixed(2);
  }

  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  };
  let dollarString = new Intl.NumberFormat("en-US", formatting_options);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signin" />;
  }

  return (
    <Container maxW={"7xl"} w={"full"}>
      {!loading && data.user.orders.product !== null ? (
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
              {data.user.orders.map((item) => (
                <Stack align={"center"} w={"full"} key={`box${item._id}`}>
                  <OrderList orders={item} />
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
