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
//import statements

//component to render, import all the vars required to render an item
export default function ProductList({
  images,
  brand,
  name,
  _id,
  price,
  product,
}) {
  //setup state for image to use for change on hover
  const [productImage, setproductImage] = useState(images[0].image);

  //setup state vars and dispatches
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //deconstruct cart from state
  const { cart } = state;

  //function used when hovering
  function over(e) {
    //only change image if the product has more than 1 image
    if (images.length > 1) {
      setproductImage(images[1].image);
    } else {
      setproductImage(images[0].image);
    }
  }
  //set the image when release hover back to original image
  function out(e) {
    setproductImage(images[0].image);
  }

  //add item to cart when user presses add to cart
  const addToCart = () => {
    //checks to see if item is already in cart
    console.log(cart);
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    //if in cart, update qty, otherwise add. update state and browser idb
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
      {/* the box holds the image */}
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
        {/* wrap image in box and use link to send to details page */}
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
              /* on hover mouse in/out to change image */
            />
          </Box>
        </Link>
        <Stack pt={10} align={"center"}>
          {/* brand name */}
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            {brand}
          </Text>
          {/* item name */}
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textAlign={"center"}
          >
            {name}
          </Heading>
          {/* price */}
          <Text fontWeight={800} fontSize={"lg"}>
            ${price}
          </Text>

          {/* add to cart button */}
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
