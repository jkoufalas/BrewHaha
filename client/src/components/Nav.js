import React, { useEffect, useState, useRef } from "react";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  Image,
  useDisclosure,
  Menu,
  MenuList,
  MenuButton,
  MenuDivider,
  MenuItem,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES_AND_SUBCATEGORIES } from "../utils/queries";
import { useDispatch } from "react-redux";
import { ADD_CATEGORIES, ADD_SUBCATEGORIES } from "../utils/actions";

import Cart from "../components/Cart";

const NAV_ITEMS = require("./data/NavElements.json");
// get all projects from json file

export default function WithSubnavigation() {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_CATEGORIES_AND_SUBCATEGORIES);

  useEffect(() => {
    if (!loading && data) {
      dispatch({
        type: ADD_CATEGORIES,
        categories: data.categories,
      });
      dispatch({
        type: ADD_SUBCATEGORIES,
        subCategories: data.subCategories,
      });
    }
  }, [data, loading, dispatch]);

  const { isOpen: isOpenReportModal, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Our Little Marketplace
          </Text> */}
          <Link href={`/`}>
            <Image height={26} src={"/Images/Logo.png"} />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {Auth.loggedIn() ? (
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={() => Auth.logout()}
              href={"/"}
            >
              Log Out
            </Button>
          ) : (
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/signin"}
            >
              Sign In
            </Button>
          )}
          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.400"}
            onClick={onOpen}
            _hover={{
              bg: "gray.300",
            }}
          >
            Cart
          </Button>
          <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"/Images/avatardefault.png"} />
              </MenuButton>
              <MenuList zIndex={"2"}>
                <MenuItem as={"a"} href={"/profile"}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem as={"a"} href={"/orders"}>
                  Orders
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Drawer
        isOpen={isOpenReportModal}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader align={"center"}>
            <Text fontSize="4xl">Cart</Text>
          </DrawerHeader>

          <DrawerBody maxW={"full"}>
            <Container maxW={"full"}>
              <Cart />
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <MobileAccountItem />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          as={Link}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileAccountItem = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        //href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          as={Link}
        >
          Account
        </Text>

        <Icon
          as={ChevronDownIcon}
          transition={"all .25s ease-in-out"}
          transform={isOpen ? "rotate(180deg)" : ""}
          w={6}
          h={6}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          <Link key={"profile"} py={2} href={"/profile"}>
            Profile
          </Link>
          <Link key={"orders"} py={2} href={"/orders"}>
            Orders
          </Link>
        </Stack>
      </Collapse>
    </Stack>
  );
};
