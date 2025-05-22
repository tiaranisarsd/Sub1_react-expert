import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

export default function CommentInput({ comment }) {
  const [commentValue, setCommentValue, setValue] = useInput();
  const toast = useToast();

  const handleCommentSubmit = () => {

    if (!commentValue.trim()) {
      toast({
        title: "Komentar tidak boleh kosong.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    comment({ commentValue });
    toast({
      title: "Komentar berhasil dikirim.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setValue("");
  };

  return (
    <Box mt={4}>
      <Card
        bg="#f2f4f8"
        shadow="md"
        m={4}
        borderRadius="lg"
        _hover={{
          shadow: "lg",
          transform: "translateY(-2px)",
          transition: "0.2s",
        }}
      >
        <CardBody>
          <Heading as="h3" fontSize="xl" mb={3} className="text-blue">
            Beri Komentar
          </Heading>
          <Textarea
            placeholder="Tulis komentarmu di sini..."
            bg="white"
            borderRadius="md"
            focusBorderColor="#f2f4f8"
            value={commentValue}
            onChange={setCommentValue}
            _hover={{ borderColor: "#12175E" }}
            mb={3}
            resize="vertical"
            minHeight="100px"
          />
          <Button
            w="50"
            size="md"
            mt={2}
            bg="#12175E"
            color="white"
            variant="solid"
            type="button"
            onClick={handleCommentSubmit}
            _hover={{ transform: "scale(1.03)" }}
            transition="all 0.2s"
          >
            Kirim
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};
