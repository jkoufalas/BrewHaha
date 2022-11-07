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
import { useForm } from "react-hook-form";

export default function ReviewForm() {
  const { handleSubmit } = useForm();

  let [value, setValue] = useState("");
  const [rating, setRating] = useState(0);

  let handleTextChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const { isOpen, onToggle } = useDisclosure();
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  function onSubmit() {
    console.log("--------------------");
    console.log(value);
    console.log(rating);
    console.log("--------------------");
  }
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

        <Button onClick={onToggle}>Add Review</Button>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Add Rating:</FormLabel>
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
                value={value}
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
