import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { postedAt } from "../utils/index";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useState } from "react";

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

  const onUpvoteHandleClick = () => {
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setUpVoteSetActive(false);
    } else {
      upVote(id);
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = () => {
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setDownVoteSetActive(false);
    } else {
      downVote(id);
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  return (
<CardBody m={-2}>
  <Card
    bg="#FAFAFA"
    shadow="md"
    borderRadius="lg"
    _hover={{ shadow: "lg", transform: "translateY(-2px)", transition: "0.2s" }}
  >
    <CardHeader
      bg="#f2f4f8"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderTopRadius="lg"
    >
      <Flex className="m-1" align="center" gap={2}>
        <Avatar size="sm" name={owner.name} src={owner.avatar} />
        <Heading className="my-auto" as="p" fontSize="md" color="teal.900">
          {owner.name}
        </Heading>
      </Flex>
      <Text className="my-auto" fontSize="sm" color="teal.800">
        {postedAt(createdAt)}
      </Text>
    </CardHeader>

    <CardBody mt={3} pt={2}>
      <Text as="div" className="text-blue">
        {parse(content)}
      </Text>
    </CardBody>

    <CardFooter
    mt={-3}
      bg="#FAFAFA"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      borderBottomRadius="sm"
    >
      <Flex gap={2}>
        <Button
          onClick={onUpvoteHandleClick}
          leftIcon={upVoteIsActive ? <FaThumbsUp /> : <FaRegThumbsUp />}
          colorScheme={upVoteIsActive ? "green" : "gray"}
          variant={upVoteIsActive ? "solid" : "outline"}
          _hover={{ bg: upVoteIsActive ? "green.500" : "gray.100", transform: "scale(1.05)" }}
          transition="all 0.2s"
          size="sm"
        >
          {upVotesBy.length}
        </Button>
        <Button
          onClick={onDownvoteHandleClick}
          leftIcon={downVoteIsActive ? <FaThumbsDown /> : <FaRegThumbsDown />}
          colorScheme={downVoteIsActive ? "red" : "gray"}
          variant={downVoteIsActive ? "solid" : "outline"}
          _hover={{ bg: downVoteIsActive ? "red.500" : "gray.100", transform: "scale(1.05)" }}
          transition="all 0.2s"
          size="sm"
        >
          {downVotesBy.length}
        </Button>
      </Flex>
    </CardFooter>
  </Card>
</CardBody>

  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export { userShape, commentItemShape };
