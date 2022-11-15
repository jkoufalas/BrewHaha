import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
//import useMutation from the apollo clien API
import { useMutation } from "@apollo/client";
//import the LOGIN mutation from utilities
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

export default function SignIn() {
  //setup local state form data
  const [loginFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  //setup alert
  const [showAlert, setShowAlert] = useState(false);

  //setup mutation to login
  const [loginUser] = useMutation(LOGIN);

  //handles onChange event for all inputs using name of input to determine the local state to change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...loginFormData, [name]: value });
  };

  //handles the submit when the user click button
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //  use mutation and submit the variable of the user from the Form data
      // the returned data is the user
      const { data } = await loginUser({
        variables: { ...loginFormData },
      });
      //use the created user to submit the token to the Auth utility for local storage
      Auth.login(data.login.token);
    } catch (err) {
      //if the sign in error, display alert to user
      console.error(err);
      setShowAlert(true);
    }

    //reset form data after login attempt
    setUserFormData({
      username: "",
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
          {/* render alert when state var changed when login errors */}
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
          {/* setup sign in form */}
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text color="muted">Need an account?</Text>
          <Button as={"a"} variant="link" colorScheme="blue" href={"/signup"}>
            Sign up
          </Button>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {/* setup form */}
            <form onSubmit={handleFormSubmit}>
              {/* form control and input for each field
              value for each input is its own state var, where change by user is handled by handleInputChange
               */}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={loginFormData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  type={"submit"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
