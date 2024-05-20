import React, { useMemo } from "react";
import { FlatList, Text } from "@gluestack-ui/themed";
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
  //console.log('session',ses)
  return (
    <>
      {sessionFiltered.length === 0 ? (
        <EmptyWorkouts sessionsCount={sessions.length} state={state} />
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
