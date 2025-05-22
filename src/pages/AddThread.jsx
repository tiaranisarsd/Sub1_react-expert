import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import AddThreadInput from "../components/AddThreadInput";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/threads/action";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";

function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onCreate = ({ title, body, category }) => {
    setLoading(true);
    const successCallback = () => {
      setLoading(false);
      navigate("/");
    };

    dispatch(asyncAddThread({ title, body, category, successCallback }));
  };

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Flex alignItems="center" mb={3}>
              <Text fontSize="sm" my={4} color="#12175E">
                <ChakraLink
                  as={RouterLink}
                  to="/"
                  color="gray.600"
                  fontWeight="medium"
                  _hover={{ opacity: "75%", textDecoration: "none" }}
                >
                  Kembali
                </ChakraLink>{" "}
                &gt; <Text as="span" fontWeight="bold">Tambah Diskusi</Text>
              </Text>
            </Flex>

            <Box as="header">
              <Heading as="h2" fontSize="3xl" color="#12175E" mt="1rem" mb={6}>
                Buat diskusi baru
              </Heading>
            </Box>

            <AddThreadInput addThread={onCreate} isLoading={loading} />
          </>
        )}
      </Container>
    </Box>
  );
}

export default AddThread;
