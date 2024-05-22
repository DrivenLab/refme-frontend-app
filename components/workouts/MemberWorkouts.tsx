import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonIcon,
  Pressable,
  SafeAreaView,
  Text,
  VStack,
  FlatList,
} from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
import { Link } from "expo-router";

import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
import { Image } from "expo-image";
import { AddIcon } from "@gluestack-ui/themed";
import { useGetSessions } from "@/queries/session.query";
import { useAuth } from "@/context/auth";
import SessionList from "@/components/session/SessionList";
import WorkoutItem from "@/components/workouts/WorkoutItem";
import EmptyWorkouts from "@/components/workouts/EmptyWorkouts";

const MemberWorkouts = () => {
  const [tab, setTab] = useState<"pending" | "finished">("pending");
  const { sessions, isLoadingSession } = useGetSessions();

  return (
    <>
      <Box flexDirection="row" justifyContent="center">
        <Button
          width={60}
          rounded="$full"
          height={60}
          bg="$primary"
          borderColor="indigo600"
          position="absolute"
          top={-30}
          hardShadow="3"
        >
          <ButtonIcon color="white" as={AddIcon} />
        </Button>
      </Box>
      <CTab
        currentTab={tab}
        changeCurrentTab={(tab_: string) =>
          setTab(tab_ as "pending" | "finished")
        }
        tabs={[
          { label: i18n.t("workout_pending"), value: "pending" },
          { label: i18n.t("workout_finished"), value: "finished" },
        ]}
      />
      <SessionList sessions={sessions} state={tab} />
    </>
  );
};

export default MemberWorkouts;
