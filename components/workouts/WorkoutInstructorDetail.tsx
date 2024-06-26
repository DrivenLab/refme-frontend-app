import { StyleSheet } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";

import React from "react";

type Props = {
  idWorkout: number;
};

const WorkoutInstructorDetail = ({ idWorkout }: Props) => {
  const router = useRouter();

  const handleOnPress = () => {
    router.push(`/workouts/assignReferee/${idWorkout}`);
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
          {i18n.t("create_workout.assign_workout")}
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
