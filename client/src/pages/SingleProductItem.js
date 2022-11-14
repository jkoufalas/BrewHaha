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
import { Redirect } from "react-router-dom";

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

export default function SingleProductItem() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { id },
  });

  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [
      { query: QUERY_PRODUCT, variables: { id } }, // DocumentNode object parsed with gql
    ],
  });

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
    }
  }, [data]);

  const submitRating = async (reviewFormData) => {
    try {
      //  use mutation and submit the variable of the user from the Form data
      // the returned data is the user
      const { data } = await addReview({
        variables: { ...reviewFormData },
      });
      setReviewSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...data.product, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...data.product, purchaseQuantity: 1 });
    }
  };

  if (!loading && data.product === null) {
    return <Redirect to="/NotFound" />;
  }

  return (
    <Container maxW={"7xl"}>
      {!loading && data.product !== null ? (
        <div>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex justifyContent={"center"}>
              <ImageCarousel images={data.product.images} />
            </Flex>

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
                <VStack spacing={{ base: 4, sm: 6 }}>
                  {data.product.description.map((item, index) =>
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
                  <List spacing={2}>
                    {data.product.includes.map((item, index) => (
                      <ListItem key={`includes${index}`}>{item.name}</ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>

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
          <ReviewForm
            product_id={id}
            submitRating={submitRating}
            reviewSubmitted={reviewSubmitted}
          />
          <ReviewList reviews={data.product.reviews} />
        </div>
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
