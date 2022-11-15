import React, { useState } from "react";
import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import Rating from "../../components/Rating";
import {
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Flex,
  chakra,
} from "@chakra-ui/react";
//import statements

//component render
export default function ReviewForm({
  product_id,
  submitRating,
  reviewSubmitted,
}) {
  //sets up local variables
  const [reviewFormData, setReviewFormData] = useState({
    id: product_id,
    comment: "",
    rating: 0,
  });

  //change state of comment by input change
  let handleTextChange = (e) => {
    let inputValue = e.target.value;
    setReviewFormData({ ...reviewFormData, comment: inputValue });
  };
  //setup slide open toggle for rating form area
  const { isOpen, onToggle } = useDisclosure();

  //changes state of when star rating changed
  const changeRating = (newRating) => {
    setReviewFormData({ ...reviewFormData, rating: newRating });
  };

  //when the user submits review
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //submit form data to parent so it can do mutation, if mutation is done where query for page data is, then it can call a refresh query to update page data
    submitRating(reviewFormData);

    //reset local state
    setReviewFormData({
      ...reviewFormData,
      comment: "",
      rating: 0,
    });
    //close form
    onToggle();
  };

  return (
    <Flex
      textAlign={"center"}
      pt={10}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <chakra.h3
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          fontSize={20}
          textTransform={"uppercase"}
          color={"blue.400"}
        >
          Would you like to review the product:
        </chakra.h3>
        {/* disable button if the user has already submitted a review */}
        <Button onClick={onToggle} isDisabled={reviewSubmitted}>
          Add Review
        </Button>
      </Box>
      {/* collapse used so that the form is only shown when user clicks the add review button */}
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              {/* rating stars component */}
              <Rating
                size={32}
                icon="star"
                scale={5}
                fillColor="gold"
                strokeColor="grey"
                changeRating={changeRating}
                id="rating"
              />
            </FormControl>
            <FormControl>
              {/* comments */}
              <FormLabel>Review Comment:</FormLabel>
              <Textarea
                id="comments"
                value={reviewFormData.comment}
                onChange={handleTextChange}
                size="sm"
                isRequired
              />
              <FormHelperText>Please enter your comments</FormHelperText>
            </FormControl>
            <FormControl>
              {/* submit button */}
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                type="submit"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Collapse>
    </Flex>
  );
}
