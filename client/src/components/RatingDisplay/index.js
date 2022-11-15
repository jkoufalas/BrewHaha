import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

//this displays the rating for reviews
export default function Rating({ rating }) {
  //sets up size of star
  const size = 25;
  const starRating = [];

  //sets up a rating icon
  const RatingIcon = ({ fill }) => {
    return (
      <StarIcon
        size={`${size}px`}
        color={"gold"}
        stroke={"grey"}
        fillOpacity={fill ? "100%" : "0"}
      />
    );
  };

  //sets up the rating icon based on the fill by the rating value
  const RatingButton = ({ idx, fill }) => {
    return (
      <Box height={`${size}px`} width={`${size}px`} variant="unstyled" mx={1}>
        <RatingIcon fill={fill} />
      </Box>
    );
  };

  //sets up the list of stars
  for (let i = 1; i <= 5; i++) {
    starRating.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
  }

  return (
    <Stack isInline mt={8} justify="center">
      {starRating}
    </Stack>
  );
}
