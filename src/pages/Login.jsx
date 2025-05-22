import { Link} from "react-router-dom";
import { Heading, Text, Link as ChakraLink, Flex, Box, useToast } from "@chakra-ui/react";
import LoginInput from "../components/LoginInput";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useEffect, useState } from "react";
import { asyncPreloadProcess } from "../states/isPreload/action";

function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogin = async ({ email, password }) => {
    setLoading(true); 
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
      toast({
        title: "Login Failed",
        description: "Email atau password salah",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      as="section"
      w="full"
      align="center"
      h="100vh"
      bg="white"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="full"
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading fontSize={"2xl"} color="#12175E" mb={1} textAlign="center">
          Masuk
        </Heading>
        <LoginInput login={onLogin} loading={loading} /> 
        <Text mt={4} textAlign="center">
          <ChakraLink as={Link} to={"/register"} color={"#12175E"}>
            Buat Akun Baru
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
