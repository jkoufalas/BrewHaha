import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//import useMutation from the apollo clien API
import { useMutation } from "@apollo/client";
//import the ADD_USER mutation from utilities
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Signup() {
  const [signinFormData, setSigninFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  //setup the mutation ADD_USER and assign the accessor method to be addUser
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSigninFormData({ ...signinFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //  use mutation and submit the variable of the user from the Form data
      // the returned data is the user
      console.log(signinFormData);
      const { data } = await addUser({
        variables: { ...signinFormData },
      });
      //use the created user to submit the token to the Auth utility for local storage
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setSigninFormData({
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {showAlert ? (
            <Alert status="error">
              <AlertIcon />
              <Box>
                <AlertTitle>Login Failure!</AlertTitle>
                <AlertDescription>
                  Something went wrong with your login credentials!
                </AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={() => setShowAlert(false)}
              />
            </Alert>
          ) : null}
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <Button as={"a"} variant="link" colorScheme="blue" href={"/signin"}>
              Sign in
            </Button>
          </HStack>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleFormSubmit}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={signinFormData.firstname}
                      onChange={handleInputChange}
                      name="firstname"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={signinFormData.lastname}
                      onChange={handleInputChange}
                      name="lastname"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={signinFormData.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  value={signinFormData.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={signinFormData.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={signinFormData.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type={"submit"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
