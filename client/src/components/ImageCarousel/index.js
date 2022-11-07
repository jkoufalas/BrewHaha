import { Carousel } from "react-carousel-minimal";

function ImageCarousel() {
  const data = [
    {
      image: "/Images/hilfigerjacket.jpg",
    },
    {
      image: "/Images/hilfigerjacket1.jpg",
    },
    {
      image: "/Images/hilfigerjacket2.jpg",
    },
    {
      image: "/Images/hilfigerjacket.jpg",
    },
    {
      image: "/Images/hilfigerjacket1.jpg",
    },
    {
      image: "/Images/hilfigerjacket2.jpg",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "0 20px",
          }}
        >
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
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
