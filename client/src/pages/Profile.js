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
  //setup local state to map data input
  const [profileFormData, setProfileFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  //query for user data
  const { loading, data } = useQuery(QUERY_USER);

  //once query is returned, load data into state for display in form
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

  // set state for alerts
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  //setup the mutation UPDATE_USER and assign the accessor method to be updateUser
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: QUERY_USER }, // DocumentNode object parsed with gql
    ],
  });

  //handle change to any state var
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProfileFormData({ ...profileFormData, [name]: value });
  };

  //when the user submits the updated profile
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //  use mutation and submit the variable of the user from the Form data
      // the returned data is the user
      await updateUser({
        variables: { ...profileFormData },
      });
      //show user data updated alert to notify user of success
      setShowAlertSuccess(true);
    } catch (err) {
      //show error alert to show user that update failed
      console.error(err);
      setShowAlert(true);
    }

    //reset local state
    setProfileFormData({
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
  };

  //if user is not logged in send to sign in
  if (!Auth.loggedIn()) {
    return <Navigate to="/signin" />;
  }

  return (
    /* display a form and add queried data */
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {/* setup error alert, set to true by state var */}
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
                /* when user clicks the close button toggle alert state var */
              />
            </Alert>
          ) : null}
          {/* setup success alert, set to true by state var */}

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
                /* when user clicks the close button toggle alert state var */
              />
            </Alert>
          ) : null}
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Profile
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            {/* the form that holds the users profile */}
            <form onSubmit={handleFormSubmit}>
              <HStack>
                <Box>
                  {/* form control for each variable, value loaded from local state and when the input changes it is handled
                  by the handleInputChange method, this is the same for all profile input data */}
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
