import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text, Button, ButtonText } from "@gluestack-ui/themed";

import i18n from "@/languages/i18n";
import { Href, Link, useRouter } from "expo-router";

import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";
import DmLogo from "@/assets/svgs/DmLogo";
import { useAuth } from "@/context/auth";

const WorkoutInstructorDetail = () => {
  const router = useRouter();

  const handleOnPress = () => {
    router.push("/workouts/assignReferee/" as Href<string>);
  };

  return (
    <>
      <Button
        onPress={handleOnPress}
        mt={"$6"}
        bg="$primary"
        rounded="$full"
        height={50}
        mb={20}
      >
        <ButtonText color="black" fontWeight="medium">
          Comenzar
        </ButtonText>
      </Button>
    </>
  );
};

export default WorkoutInstructorDetail;
const styles = StyleSheet.create({
  WorkoutInstructorDetail: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
