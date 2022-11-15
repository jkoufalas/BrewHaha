import React, { useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const Rating = React.forwardRef(
  ({ size, scale, fillColor, strokeColor, changeRating }, ref) => {
    //setup local state
    const [rating, setRating] = useState(0);
    //setup buttons
    const buttons = [];

    //when user clicks a button
    const onClick = (idx) => {
      //make sure the value isn't NaN
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
          changeRating(0);
        } else {
          setRating(idx);
          changeRating(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <StarIcon
          size={`${size}px`}
          color={fillColor}
          stroke={strokeColor}
          onClick={onClick}
          fillOpacity={fill ? "100%" : "0"}
        />
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          type="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          variant="unstyled"
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    //create a button in the button list for the size of the scale
    for (let i = 1; i <= scale; i++) {
      //conditional render for rating, setup id for rating change
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline mt={8} justify="center">
        {/* use input of buttons */}
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        {/* sets up the text after the stars */}
        <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box>
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
