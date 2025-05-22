import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      as="form"
      p={8}
      borderWidth={0}
      maxWidth="500px"
      w="full"
      bg="white"
    >
      <FormControl id="name" isRequired>
        <FormLabel color="#12175E">Nama</FormLabel>
        <Input
          type="text"
          focusBorderColor="white"
          value={name}
          placeholder="Masukkan nama Anda"
          onChange={onNameChange}
          borderRadius="md"
          _hover={{ borderColor: "#12175E" }}
        />
      </FormControl>

      <FormControl mt={4} id="email" isRequired>
        <FormLabel color="#12175E">Email</FormLabel>
        <Input
          type="email"
          focusBorderColor="#12175E"
          value={email}
          onChange={onEmailChange}
          placeholder="johndoe@example.com"
          borderRadius="md"
          _hover={{ borderColor: "#12175E" }}
        />
      </FormControl>

      <FormControl mt={4} id="password" isRequired>
        <FormLabel color="#12175E">Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            focusBorderColor="#f2f4f8"
            value={password}
            onChange={onPasswordChange}
            borderRadius="md"
            placeholder="********"
            _hover={{ borderColor: "#12175E" }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        w="full"
        mt="6"
        bg="#12175E"
        color="white"
        variant="solid"
        type="button"
        onClick={() => register({ name, email, password })}
        _hover={{ transform: "scale(1.03)" }}
        transition="all 0.2s"
      >
        Daftar
      </Button>
    </Box>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
