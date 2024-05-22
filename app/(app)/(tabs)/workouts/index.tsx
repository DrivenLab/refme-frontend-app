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

const Workouts = () => {
  const { userRole } = useAuth();

  const [tab, setTab] = useState<"pending" | "finished">("pending");
  const { sessions, isLoadingSession } = useGetSessions();

  return (
    <SafeAreaView bg="$white" flex={1}>
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 130, width: "100%" }}
      />
      <VStack
        px={"$3"}
        space="lg"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        position="relative"
        top={-20}
        bg="$white"
      >
        <Box flexDirection="row" justifyContent="center" bg="$red">
          {userRole !== "member" ? (
            <Link href="/workouts/createWorkout" asChild>
              <Button
                width={60}
                rounded="$full"
                height={60}
                bg="$primary"
                borderColor="indigo600"
                position="absolute"
                top={-30}
              >
                <ButtonIcon color="white" as={AddIcon} />
              </Button>
            </Link>
          ) : (
            <Button
              width={60}
              rounded="$full"
              height={60}
              bg="$primary"
              borderColor="indigo600"
              position="absolute"
              top={-30}
            >
              <ButtonIcon color="white" as={AddIcon} />
            </Button>
          )}
        </Box>
        {userRole === "member" ? (
          <>
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
        ) : (
          <>
            <Box borderBottomWidth={4} borderColor={"$black"} pb={10} pt={25}>
              <Text color="black" textAlign="center" fontWeight={"$bold"}>
                Entrenamientos
              </Text>
            </Box>
            {sessions.length === 0 ? (
              <Box height="$3/4">
                <EmptyWorkouts sessionsCount={0} state={"pending"} />
              </Box>
            ) : (
              <FlatList
                data={sessions}
                mb={200}
                renderItem={({ item: workout }: ListRenderItemInfo<any>) => (
                  <WorkoutItem workout={workout} idWorkout={workout.id} />
                )}
                keyExtractor={(item: any) => item.id}
              />
            )}
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
};

export default Workouts;
