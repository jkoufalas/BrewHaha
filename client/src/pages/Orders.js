import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Center,
  Container,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import OrderList from "../components/OrderList";

//import useMutation from the apollo clien API
import { useQuery } from "@apollo/client";
//import the ADD_USER mutation from utilities
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

export default function Orders() {
  const { loading, data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (!loading && data) {
      /* console.log(data.user);
      console.log(data.user.orders[0].products[0]); */
    }
  }, [data]);

  return (
    <Container maxW={"7xl"} w={"full"}>
      {!loading && data.user.orders.product !== null ? (
        <Flex
          minH={"100vh"}
          align={"center"}
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
                <>
                  <OrderList orders={item} />
                </>
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
