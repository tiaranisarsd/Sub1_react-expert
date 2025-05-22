import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Stack,
  Textarea,
  Flex,
  useToast,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";

export default function AddThreadInput({ addThread }) {
  const toast = useToast();

  const [title, setTitleChange] = useInput("");
  const [category, setCategoryChange] = useInput("");
  const [body, setBodyChange] = useInput("");

  const handleAddThread = () => {
    if (!title.trim() || !category.trim() || !body.trim()) {
      toast({
        title: "Semua field harus diisi.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    addThread({ title, body, category });

    toast({
      title: "Diskusi berhasil ditambahkan!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTitleChange("");
    setCategoryChange("");
    setBodyChange("");
  };

  return (
    <Box mt={4}>
      <Card
        bg="#f2f4f8"
        shadow="md"
        borderRadius="lg"
        _hover={{ shadow: "lg", transform: "translateY(-2px)", transition: "0.2s" }}
      >
        <CardBody>
          <Stack spacing={3}>
            <Input
              focusBorderColor="#12175E"
              placeholder="Judul diskusi"
              value={title}
              onChange={setTitleChange}
              bg="white"
              borderRadius="md"
              _hover={{ borderColor: "#12175E" }}
            />
            <Input
              focusBorderColor="#12175E"
              placeholder="Kategori (misalnya: teknologi, edukasi, hobi)"
              value={category}
              onChange={setCategoryChange}
              bg="white"
              borderRadius="md"
              _hover={{ borderColor: "#12175E" }}
            />
            <Textarea
              focusBorderColor="#12175E"
              placeholder="Tuliskan isi diskusi..."
              value={body}
              onChange={setBodyChange}
              bg="white"
              borderRadius="md"
              _hover={{ borderColor: "#12175E" }}
              resize="vertical"
              minHeight="120px"
            />
          </Stack>

          <Flex justifyContent="flex-end" mt={4}>
            <Button
              fontSize="14px"
              bg="#12175E"
              color="white"
              variant="solid"
              type="button"
              onClick={handleAddThread}
              _hover={{ transform: "scale(1.03)" }}
              transition="all 0.2s"
            >
              Buat Diskusi
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
