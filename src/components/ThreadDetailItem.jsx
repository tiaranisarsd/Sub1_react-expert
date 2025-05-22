import {
  Button,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  Tag,
} from "@chakra-ui/react";
import {
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { postedAt } from "../utils/index";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ThreadDetailItem({
  id,
  upVote,
  downVote,
  neutralizeVote,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId,
}) {
  const navigate = useNavigate();

  const [upVoteIsActive, setUpVoteSetActive] = useState(false);
  const [downVoteIsActive, setDownVoteSetActive] = useState(false);

  useEffect(() => {
    setUpVoteSetActive(upVotesBy.includes(authUserId));
    setDownVoteSetActive(downVotesBy.includes(authUserId));
  }, [authUserId, upVotesBy, downVotesBy]);

  const onThreadClick = () => {
    navigate(`/thread/${id}`); 
  };

  const onUpvoteHandleClick = (e) => {
    e.stopPropagation(); 
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setUpVoteSetActive(false);
    } else {
      upVote(id);
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = (e) => {
    e.stopPropagation();
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
    <Card
      bg="#FAFAFA"
      shadow="md"
      borderRadius="lg"
      onClick={onThreadClick}
      _hover={{ shadow: "lg", transform: "translateY(-2px)", transition: "0.2s" }}
    >
      <CardHeader
        bg="#f2f4f8"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderTopRadius="lg"
      >
        <Tag bg="#12175E" size="sm" p={2} color="white" borderRadius="full">
          #{category}
        </Tag>
        <Text fontSize="sm" color="#12175E">
          {postedAt(createdAt)}
        </Text>
      </CardHeader>

      <CardBody pt={3} pb={1}>
        <Heading className="text-blue" as="h2" size="md" mb={3}>
          {title}
        </Heading>
        <Text color="gray.700" fontSize="md" noOfLines={5}>
          {parse(body)}
        </Text>
      </CardBody>

    <CardFooter
      bg="#f2f4f8"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottomRadius="lg"
    >
      <Flex gap={2}>
      <Button
        onClick={onUpvoteHandleClick}
        leftIcon={<FaThumbsUp />}
        colorScheme="green"
        variant={upVoteIsActive ? "solid" : "outline"}
        size="sm"
      >
        {upVotesBy.length}
      </Button>

      <Button
        onClick={onDownvoteHandleClick}
        leftIcon={<FaThumbsDown />}
        colorScheme="red"
        variant={downVoteIsActive ? "solid" : "outline"}
        size="sm"
      >
        {downVotesBy.length}
      </Button>

      </Flex>

      <Flex align="center" gap={2}>
        <Avatar size="sm" name={owner.name} src={owner.avatar} />
        <Text fontSize="sm" className="my-auto">
          Dibuat oleh <strong>{owner.name}</strong>
        </Text>
      </Flex>
    </CardFooter>

    </Card>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadDetail = {
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetailItem.propTypes = {
  ...threadDetail,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};
