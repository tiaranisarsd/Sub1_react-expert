import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Stack,
  Heading,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClickVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Email dan password wajib diisi.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await login({ email, password }); 
      toast({
        title: "Login berhasil.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      navigate("/"); 
    } catch (error) {
      toast({
        title: "Login gagal.",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={0} maxWidth="500px" mx="auto" p={3} borderWidth={0}>
      <Heading fontSize="18px" mb={6} textAlign="center" color="#12175E">
        Masuk ke Akun Anda
      </Heading>
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel color="#12175E">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="johndoe@gmail.com"
              borderRadius="md"
              focusBorderColor="#12175E"
              _hover={{ borderColor: "#12175E" }}
            />
          </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color="#12175E">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={onPasswordChange}
                  placeholder="••••••••"
                  borderRadius="md"
                  focusBorderColor="#12175E"
                  _hover={{ borderColor: "#12175E" }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickVisibility} type="button">
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          <Button
            type="submit"
            bg="#12175E"
            color="white"
            mt={2}
            _hover={{ transform: "scale(1.03)" }}
            transition="all 0.2s"
          >
            Masuk
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
