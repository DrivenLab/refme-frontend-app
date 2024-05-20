import React, { useMemo } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
import { Session } from "@/types/session";
import WorkoutItem from "../workouts/WorkoutItem";
import EmptyWorkouts from "../workouts/EmptyWorkouts";

type Props = {
  state: "pending" | "finished";
  isUpToDate?: boolean;
  sessions: Session[];
};
const SessionList = ({ state, sessions }: Props) => {
  const sessionFiltered = useMemo(() => {
    if (state === "finished") return sessions.filter((s) => s.isCompleted);
    else return sessions.filter((s) => !s.isCompleted);
  }, [state, sessions]);
  return (
    <>
      {sessionFiltered.length === 0 ? (
        <Box height="$3/4">
          <EmptyWorkouts sessionsCount={sessions.length} state={state} />
        </Box>
      ) : (
        <FlatList
          data={sessionFiltered}
          renderItem={({ item: session }: ListRenderItemInfo<any>) => (
            <WorkoutItem workout={session.workout} idSession={session.id} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </>
  );
};

export default SessionList;
