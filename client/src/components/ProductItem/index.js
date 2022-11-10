import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ProductList({
  images,
  brand,
  name,
  _id,
  price,
  quantity,
}) {
  const [productImage, setproductImage] = useState(images[0].image);

  function over(e) {
    if (images.length > 1) {
      setproductImage(images[1].image);
    } else {
      setproductImage(images[0].image);
    }
  }
  function out(e) {
    setproductImage(images[0].image);
  }
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Link href={`/products/${_id}`}>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"330px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${productImage})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={360}
              width={282}
              objectFit={"cover"}
              src={productImage}
              onMouseOver={over}
              onMouseOut={out}
            />
          </Box>
        </Link>
        <Stack pt={10} align={"center"}>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            {brand}
          </Text>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textAlign={"center"}
          >
            {name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${price}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
