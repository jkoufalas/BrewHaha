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

export default function ReviewForm({
  product_id,
  submitRating,
  reviewSubmitted,
}) {
  const [reviewFormData, setReviewFormData] = useState({
    id: product_id,
    comment: "",
    rating: 0,
  });

  let handleTextChange = (e) => {
    let inputValue = e.target.value;
    setReviewFormData({ ...reviewFormData, comment: inputValue });
  };
  const { isOpen, onToggle } = useDisclosure();

  const changeRating = (newRating) => {
    setReviewFormData({ ...reviewFormData, rating: newRating });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //submit form data to parent so it can do mutation, if mutation is done where query for page data is, then it can call a refresh query to update page data
    submitRating(reviewFormData);

    setReviewFormData({
      ...reviewFormData,
      comment: "",
      rating: 0,
    });

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

        <Button onClick={onToggle} isDisabled={reviewSubmitted}>
          Add Review
        </Button>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <form onSubmit={handleFormSubmit}>
            <FormControl>
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
