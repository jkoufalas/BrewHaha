import {
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function OrderList({ orders }) {
  console.log(orders);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box width={"full"} margin={"auto"}>
      <Heading
        fontFamily={"Work Sans"}
        fontWeight={"bold"}
        fontSize={20}
        textTransform={"uppercase"}
        color={"blue.400"}
      >
        Order {orders._id}
      </Heading>
      <Button onClick={onToggle}>Show Details</Button>
      <Collapse in={isOpen} animateOpacity>
        {orders.products.map((item) => (
          <Stack spacing={8} direction="row" w={"full"}>
            <Text
              color={"gray.500"}
              fontSize={"lg"}
              textTransform={"uppercase"}
              key={"brand"}
            >
              {item.brand}
            </Text>
            <Text fontSize={"lg"} key={"name"}>
              {item.name}
            </Text>
            <Text color={"gray.400"} fontSize={"lg"} key={"price"}>
              ${item.price} AUD
            </Text>
            <Text color={"gray.400"} fontSize={"lg"} key={"qty"}>
              Qty: {item.quantity}
            </Text>
          </Stack>
        ))}
      </Collapse>
    </Box>
  );
}
