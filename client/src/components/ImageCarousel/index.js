import { Box } from "@chakra-ui/react";
import { Carousel } from "react-carousel-minimal";
//import carousel

function ImageCarousel({ images }) {
  const data = images.map((singleImage) => ({ image: singleImage.image }));
  //convert the data from the product into just an array of images required for carousel

  //setup parameters for carousels style
  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <Box className="App">
      <Box style={{ textAlign: "center" }}>
        <Box
          style={{
            padding: "0 20px",
          }}
        >
          {/* render carousel with images using standard info */}
          <Carousel
            data={data}
            time={4000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="grey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ImageCarousel;
