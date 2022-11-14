import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  Collapse,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

export default function OrderList({ orders }) {
  const { isOpen, onToggle } = useDisclosure();

  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  };
  let dollarString = new Intl.NumberFormat("en-US", formatting_options);

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
          <SimpleGrid
            columns={5}
            spacing={{ base: 8, md: 10 }}
            w={"full"}
            key={`grid${item._id}`}
          >
            <Text
              color={"gray.500"}
              fontSize={"lg"}
              textTransform={"uppercase"}
              key={`brand${item._id}`}
            >
              {item.brand}
            </Text>
            <Text fontSize={"lg"} key={`name${item._id}`}>
              {item.name}
            </Text>
            <Text color={"gray.400"} fontSize={"lg"} key={`price${item._id}`}>
              {dollarString.format(item.price)} AUD
            </Text>
            <Text color={"gray.400"} fontSize={"lg"} key={`qty${item._id}`}>
              Qty: {item.quantity}
            </Text>

            <Text color={"gray.400"} fontSize={"lg"} key={`total${item._id}`}>
              Total: {dollarString.format(item.price * item.quantity)}
            </Text>
          </SimpleGrid>
        ))}
      </Collapse>
    </Box>
  );
}
