import { Link, useNavigate } from "react-router-dom";
import {
  Heading,
  Text,
  Link as ChakraLink,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import RegisterInput from "../components/RegisterInput";
import { useEffect } from "react";
import { asyncPreloadProcess } from "../states/isPreload/action";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast(); 

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

const onRegister = ({ name, email, password }) => {
  const successCallback = () => {
    toast({
      title: "Registrasi berhasil!",
      description: "Akun Anda telah dibuat.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  };

  const errorCallback = (message) => {
    toast({
      title: "Registrasi gagal!",
      description: message || "Terjadi kesalahan saat mendaftar.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  dispatch(
    asyncRegisterUser({
      name,
      email,
      password,
      successCallback,
      errorCallback,
    })
  );
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
          Buat akun
        </Heading>
        <RegisterInput register={onRegister} />
        <Text mt={4} textAlign="center">
          Sudah punya akun?{" "}
          <ChakraLink as={Link} to={"/login"} color={"#12175E"}>
            Masuk
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
