import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import LeaderboardUserItem from "../components/LeaderboardUserItem";
import { Box, Heading, VStack } from "@chakra-ui/react";

export default function Leaderboards() {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);
  console.log("Leaderboards state:", leaderboards);


  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Box maxW="lg" mx="auto" mb={10} p={5}>
      <Heading as="h2" mt={10} pt={5} size="lg" mb={5} color="#12175E">
        Klasemen Pengguna Aktif
      </Heading>
      <VStack spacing={4} align="stretch">
        {leaderboards.map(({ user, score }) =>
          user && typeof score === "number" ? (
            <LeaderboardUserItem
              key={user.id}
              user={user}
              score={score}
            />
          ) : null
        )}
      </VStack>
    </Box>
  );
}
