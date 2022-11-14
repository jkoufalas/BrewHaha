import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
//import useMutation from the apollo clien API
import { useMutation, useQuery } from "@apollo/client";
//import the ADD_USER mutation from utilities
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [profileFormData, setProfileFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const { loading, data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (!loading && data) {
      setProfileFormData({
        firstname: data.user.firstName,
        lastname: data.user.lastName,
        address: data.user.address,
        phoneNumber: data.user.phoneNumber,
        email: data.user.email,
      });
    }
  }, [data, loading]);

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  //setup the mutation UPDATE_USER and assign the accessor method to be updateUser
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: QUERY_USER }, // DocumentNode object parsed with gql
    ],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProfileFormData({ ...profileFormData, [name]: value });
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
      await updateUser({
        variables: { ...profileFormData },
      });
      setShowAlertSuccess(true);
      //use the created user to submit the token to the Auth utility for local storage
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setProfileFormData({
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/signin" />;
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {showAlert ? (
            <Alert status="error">
              <AlertIcon />
              <Box>
                <AlertTitle>Update Profile Failure!</AlertTitle>
                <AlertDescription>
                  Something went wrong with your profile update!
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
          {showAlertSuccess ? (
            <Alert status="success">
              <AlertIcon />
              <Box>
                <AlertTitle>Profile Updated</AlertTitle>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={() => setShowAlertSuccess(false)}
              />
            </Alert>
          ) : null}
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Profile
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleFormSubmit}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={profileFormData.firstname}
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
                      value={profileFormData.lastname}
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
                  value={profileFormData.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  value={profileFormData.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={profileFormData.email}
                  onChange={handleInputChange}
                  name="email"
                />
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
                  Update
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
