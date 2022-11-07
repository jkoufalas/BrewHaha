import React from "react";
import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import Rating from "../../components/Rating";
import {
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Stack,
} from "@chakra-ui/react";

export default function ReviewForm() {
  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const { isOpen, onToggle } = useDisclosure();
  var rating = 0;
  const changeRating = (newRating) => {
    rating = newRating;
  };
  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="black"
          mt="4"
          bg="white"
          rounded="md"
          shadow="md"
          zIndex={"1"}
        >
          <Rating
            size={48}
            icon="star"
            scale={5}
            fillColor="gold"
            strokeColor="grey"
            changeRating={changeRating}
          />

          <FormControl>
            <FormLabel>Review Comment:</FormLabel>
            <Textarea value={value} onChange={handleInputChange} size="sm" />
            <FormHelperText>Please enter your comments</FormHelperText>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </>
  );
}
