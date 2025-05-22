import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import ThreadDetailItem from "../components/ThreadDetailItem";
import CommentSection from "../components/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  asyncAddThreadComment,
  asyncNeutralizeVoteComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
} from "../states/threadDetail/action";
import { useParams, Link as RouterLink } from "react-router-dom";
import Loading from "../components/Loading";

function DetailPage() {
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      await dispatch(asyncReceiveThreadDetail(id));
      setLoading(false);
    };

    fetchDetail();
  }, [id, dispatch]);

  const onComment = ({ commentValue }) => {
    dispatch(asyncAddThreadComment({ threadId: id, commentValue }));
  };

  const onUpvoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };

  const onNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeThreadDetailVote(id));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  };

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Flex alignItems="center" mb={4}>
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
                &gt;{" "}
                <Text as="span" fontWeight="bold">
                  Detail Diskusi
                </Text>
              </Text>
            </Flex>
            <Card bg="#FAFAFA">
              <ThreadDetailItem
                upVote={onUpvoteThread}
                downVote={onDownVoteThread}
                neutralizeVote={onNeutralizeVoteThread}
                authUserId={authUser?.id}
                {...threadDetail}
              />
              <Divider className="text-blue" />
              <CommentSection
                comment={onComment}
                upVote={onUpvoteComment}
                downVote={onDownVoteComment}
                neutralizeVote={onNeutralizeVoteComment}
                authUserId={authUser?.id}
                {...threadDetail}
              />
            </Card>
          </>
        )}
      </Container>
    </Box>
  );
}

export default DetailPage;
