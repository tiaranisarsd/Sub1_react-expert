import { Avatar, Box, Flex, Text, Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function LeaderboardUserItem({ user, score, authUser }) {
  const isAuthUser = authUser?.id === user.id;

  return (
    <Flex
      justify="space-between"
      align="center"
      bg={isAuthUser ? "teal.50" : "white"}
      p={3}
      borderRadius="lg"
      boxShadow="md"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
        transition: "0.2s",
      }}
    >
      <Flex align="center" gap={2}>
        <Avatar name={user.name} me={1} src={user.avatar} />
        <Box>
          <Text
            fontWeight="semibold"
            fontSize="18"
            mb={0}
            color={isAuthUser ? "#12175E" : "gray.700"}
          >
            {user.name}{" "}
            {isAuthUser && (
              <Badge ml={2} colorScheme="teal">
                you
              </Badge>
            )}
          </Text>
          <Text fontSize="sm" mt={0} color="#12175E">
            {user.email}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="#12175E">
          {score}
        </Text>
      </Box>
    </Flex>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardUserItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
  authUser: PropTypes.shape(userShape), // authUser optional sekarang
};
