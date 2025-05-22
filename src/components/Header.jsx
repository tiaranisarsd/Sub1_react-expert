import { Flex, Heading, Avatar, Text, Box, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Header() {
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login"); 
    }
  }, [authUser, navigate]);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      h="4rem"
      bg="#12175E"
      w="100%"
      px={6}
      position="fixed"
      top={0}
      zIndex={200}
      color="white"
    >
      {authUser ? (
        <RouterLink to="/profile">
          <Flex align="center" gap={3}>
            <Avatar size="sm" name={authUser.name} src={authUser.avatar} />
            <Text fontWeight="medium" my="auto">
              {authUser.name}
            </Text>
          </Flex>
        </RouterLink>
      ) : (
        <RouterLink to="/login">
          <Button variant="link" color="white">
            Login
          </Button>
        </RouterLink>
      )}

      <Heading as="h1" fontSize="18px" flex="1" textAlign="center">
        <RouterLink
          className="text-hover"
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          Dicoding Forum App
        </RouterLink>
      </Heading>

      <Box w="150px" />
    </Flex>
  );
}
