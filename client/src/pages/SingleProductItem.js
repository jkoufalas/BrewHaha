import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  Spinner,
  Center,
  List,
  ListItem,
} from "@chakra-ui/react";
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from "../utils/actions";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ImageCarousel from "../components/ImageCarousel";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
//import useMutation from the apollo clien API
import { useMutation } from "@apollo/client";
//import the ADD_USER mutation from utilities
import { ADD_REVIEW } from "../utils/mutations";
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";
//import statements

export default function SingleProductItem() {
  //setup global state vars
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //get parameters from react route
  const { id } = useParams();

  //query a single product
  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { id },
  });

  //setup state var to know when a review has been submitted for this product by this user
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  //setup mutation to add review
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [
      { query: QUERY_PRODUCT, variables: { id } },
      //refresh query with mutation
    ],
  });

  //deconstruct cart from state, ready for use
  const { cart } = state;

  //this tests to see if the user has already submitted a review for this comment
  useEffect(() => {
    if (data && Auth.loggedIn() && data.product !== null) {
      const user_id = Auth.getProfile();
      const result = data.product.reviews.filter(
        (review) => review.user_id._id === user_id.data._id
      );
      if (result.length > 0) {
        setReviewSubmitted(true);
      }
    } else if (data && !Auth.loggedIn() && data.product !== null) {
      setReviewSubmitted(true);
    }
  }, [data]);

  //submit the rating from the user
  const submitRating = async (reviewFormData) => {
    try {
      //  use mutation and submit the variable of the user from the Form data
      // the returned data is the user
      await addReview({
        variables: { ...reviewFormData },
      });
      //set local var so user has submitted review
      setReviewSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  //handle when user adds item to cart
  const addToCart = () => {
    //see if the item submitted is already in cart
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    //if so then update quantity, update global state and browser idb
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity),
      });
      //otherwise add the item to the cart, update global state and browser idb
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...data.product, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...data.product, purchaseQuantity: 1 });
    }
  };

  //if the product id is not found after query returned, then redirect to nonfound page
  if (!loading && data.product === null) {
    return <Navigate to="/NotFound" />;
  }

  return (
    <Container maxW={"7xl"}>
      {/* render item page when data returns */}
      {!loading && data.product !== null ? (
        <div>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            {/* setup image carousel */}
            <Flex justifyContent={"center"}>
              <ImageCarousel images={data.product.images} />
            </Flex>

            {/* display data for item */}
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Text
                  color={"gray.500"}
                  fontSize={"lg"}
                  textTransform={"uppercase"}
                >
                  {data.product.brand}
                </Text>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {data.product.name}
                </Heading>
                <Text color={"gray.400"} fontWeight={300} fontSize={"2xl"}>
                  ${data?.product.price} AUD
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={"gray.600"} />}
              >
                {/* the description can have any amount of elements
                these elements can be either a title or a paragraph */}
                <VStack spacing={{ base: 4, sm: 6 }}>
                  {/* loop through all elements and diplay them */}
                  {data.product.description.map((item, index) =>
                    /* if title render title */
                    item.type === "title" ? (
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={"yellow.300"}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                        key={`desc${index}`}
                      >
                        {item.content}
                      </Text>
                    ) : (
                      /* if paragraph render paragraph */
                      <Text
                        color={"gray.400"}
                        fontSize={"2xl"}
                        fontWeight={"300"}
                        key={`desc${index}`}
                      >
                        {item.content}
                      </Text>
                    )
                  )}
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                    key={"featTitle"}
                  >
                    Features
                  </Text>
                  {/* the features can have any amount of elements
                these elements are a title and contents */}
                  <List spacing={2} key={"featList"}>
                    {data.product.features.map((item, index) => (
                      <ListItem key={`feat${index}`}>
                        <Text
                          as={"span"}
                          fontWeight={"bold"}
                          key={`featTitle${index}`}
                        >
                          {item.title}:
                        </Text>{" "}
                        {item.content}
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Details
                  </Text>
                  {/* the details can have any amount of elements
                these elements are a title and contents */}
                  <List spacing={2}>
                    {data.product.details.map((item, index) => (
                      <ListItem key={`details${index}`}>
                        <Text
                          as={"span"}
                          fontWeight={"bold"}
                          key={`detailstitle${index}`}
                        >
                          {item.title}:
                        </Text>{" "}
                        {item.content}
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Includes
                  </Text>
                  {/* the includes section can have any amount of elements
                these elements consist of a name */}
                  <List spacing={2}>
                    {data.product.includes.map((item, index) => (
                      <ListItem key={`includes${index}`}>{item.name}</ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
              {/* add to cart button */}
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
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

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
          {/* this adds the component to add the form for the user to review the product */}
          <ReviewForm
            product_id={id}
            submitRating={submitRating}
            reviewSubmitted={reviewSubmitted}
          />
          {/* this component lists all the previous reviews by users for the products */}{" "}
          <ReviewList reviews={data.product.reviews} />
        </div>
      ) : (
        /* when the page is loading render a spinner */
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
