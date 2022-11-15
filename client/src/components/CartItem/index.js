import React from "react";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import {
  Link,
  Box,
  Image,
  SimpleGrid,
  Button,
  Text,
  Input,
  Stack,
  VStack,
  Center,
} from "@chakra-ui/react";
//import statements

//cartitem, includes the item to render
const CartItem = ({ item }) => {
  //dispatch so user can remove and mod qty
  const dispatch = useDispatch();

  //remove from cart
  const removeFromCart = (item) => {
    //update cart state
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    //remove from browser database so when page reloads it loads state from there
    idbPromise("cart", "delete", { ...item });
  };

  //change val for qty
  const onChange = (e) => {
    //obtain value from target
    const value = e.target.value;
    //if the value is changed to 0, then remove, update state and idb
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
      //otherwise update the qty with the new one, using dispatch to state and idb to browser
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <Stack spacing={8} direction="row" w={"full"}>
      {/* wrap group the items data */}
      <Center>
        {/*  make the image a link to the product */}
        <Link href={`/products/${item._id}`} width={"25%"}>
          <Box
            rounded={"lg"}
            height={"70px"}
            width={"60px"}
            align={"center"}
            verticalAlign={"center"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${item.images[0].image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            {/* setup image in the box */}
            <Image
              rounded={"lg"}
              height={110}
              width={105}
              objectFit={"cover"}
              src={item.images[0].image}
            />
          </Box>
        </Link>
      </Center>

      {/* stack the data to display */}
      <VStack align="flex-start" w={"full"}>
        <Box flexGrow="1" w={"full"}>
          <SimpleGrid
            columns={{ base: 1, lg: 1 }}
            spacing={{ base: 2, md: 2 }}
            py={{ base: 3, md: 3 }}
          >
            {/* price */}
            <Text fontSize="xl" align={"center"} as="b">
              {item.brand} {item.name} -{" "}
              <Text fontSize="md" align={"center"} color={"red"} as="b">
                ${item.price}
              </Text>
            </Text>

            {/* quantity */}
            <Box>
              <Stack spacing={8} direction="row" w={"full"}>
                <Text fontSize="lg">Qty:</Text>
                <Input
                  type="number"
                  placeholder="1"
                  value={item.purchaseQuantity}
                  onChange={onChange}
                />
                {/* remove button */}
                <Button
                  rounded={"none"}
                  w={"full"}
                  size={"sm"}
                  py={"15"}
                  bg={"gray.900"}
                  color={"white"}
                  textTransform={"uppercase"}
                  onClick={() => removeFromCart(item)}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                    bg: "gray.700",
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Stack>
  );
};

export default CartItem;
