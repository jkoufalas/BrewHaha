import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { idbPromise } from "../../utils/helpers";

export default function ProductList({
  images,
  brand,
  name,
  _id,
  price,
  product,
}) {
  const [productImage, setproductImage] = useState(images[0].image);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = state;

  function over(e) {
    if (images.length > 1) {
      setproductImage(images[1].image);
    } else {
      setproductImage(images[0].image);
    }
  }
  function out(e) {
    setproductImage(images[0].image);
  }

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...product, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...product, purchaseQuantity: 1 });
    }
  };

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Link href={`/products/${_id}`}>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"330px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${productImage})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={360}
              width={282}
              objectFit={"cover"}
              src={productImage}
              onMouseOver={over}
              onMouseOut={out}
            />
          </Box>
        </Link>
        <Stack pt={10} align={"center"}>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            {brand}
          </Text>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textAlign={"center"}
          >
            {name}
          </Heading>
          <Text fontWeight={800} fontSize={"lg"}>
            ${price}
          </Text>
          <Button
            rounded={"none"}
            w={"full"}
            /* mt={8} */
            size={"lg"}
            /* py={"7"} */
            bg={"gray.900"}
            color={"white"}
            textTransform={"uppercase"}
            onClick={addToCart}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
              bg: "gray.700",
            }}
          >
            Add to cart
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
