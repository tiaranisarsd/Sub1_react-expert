import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Link as ChakraLink,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUserActionCreator } from "../states/authUser/action";
import { Link as RouterLink } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const toast = useToast();

  const [name, setName] = useState(authUser?.name || "");
  const [setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(authUser?.avatar || "");
  const [loading, setLoading] = useState(false);  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      const imageURL = URL.createObjectURL(file);
      setAvatarPreview(imageURL);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true); 

    const updatedUser = {
      ...authUser,
      name,
      avatar: avatarPreview,
    };

    dispatch(setAuthUserActionCreator(updatedUser));

    toast({
      title: "Profil berhasil diperbarui.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setLoading(false); 
  };

  return (
    <Box my="5rem" maxW="md" mx="auto" p={6} boxShadow="md" borderRadius="md">
      <Flex mb={4} align="center" justify="flex-start">
        <Text fontSize="sm" color="gray.600">
          <ChakraLink
            as={RouterLink}
            to="/"
            fontWeight="medium"
            color="blue.600"
            _hover={{ opacity: 0.75, textDecoration: "none" }}
          >
            Kembali
          </ChakraLink>{" "}
          &gt; <Text as="span" fontWeight="bold">Edit Profil</Text>
        </Text>
      </Flex>

      <Heading size="lg" mb={6} textAlign="center" color="#12175E">
        Edit Profil
      </Heading>

      <form onSubmit={handleUpdate}>
        <VStack spacing={5}>
          <Avatar name={name} src={avatarPreview} size="xl" />

          <FormControl isRequired>
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
              autoFocus
            />
          </FormControl>

          <FormControl>
            <FormLabel>Ganti Avatar</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </FormControl>

          <Button
            type="submit"
            mt={1}
            fontSize={12}
            bg="#12175E"
            color="white"
            width="50%"
            isLoading={loading}  
            loadingText="Menyimpan..."
            _hover={{background: "#12175E", opacity: "50%"}}  
          >
            Simpan Perubahan
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
