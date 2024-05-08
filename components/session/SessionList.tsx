import React from "react";
import { FlatList, Text } from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
import { Session } from "@/types/session";
import WorkoutItem from "../workouts/WorkoutItem";

type Props = {
  state: "pending" | "finished";
  isUpToDate?: boolean;
  isEmpty?: boolean;
  sessions: Session[];
};
const SessionList = ({ state, sessions, isEmpty }: Props) => {
  return (
    <>
      {isEmpty ? (
        <Text>No HAY ITEMS</Text>
      ) : (
        <FlatList
          data={sessions}
          renderItem={({ item: session }: ListRenderItemInfo<any>) => (
            <WorkoutItem
              workout={session.workout}
              navigateTo={`/workouts/${session.id}`}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </>
  );
};

export default SessionList;
