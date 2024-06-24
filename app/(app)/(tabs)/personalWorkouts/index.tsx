import React from "react";
import { Text, ScrollView, VStack, Spinner } from "@gluestack-ui/themed";

import WorkoutTypeCard from "@/components/personal-workouts/WorkoutTypeCard";
import { useGetPersonalWorkoutsConfig } from "@/queries/personalWorkouts.query";

const PersonalWorkouts = () => {
  const { isLoadingPersonalWorkoutsConfig } = useGetPersonalWorkoutsConfig();
  return (
    <ScrollView bgColor="white" px={"$3"} flex={1}>
      {isLoadingPersonalWorkoutsConfig ? (
        <Spinner />
      ) : (
        <VStack space="lg" flex={1} paddingBottom={10}>
          <Text my={"$5"} color="primary">
            ¿Qué habilidad necesitas trabajar hoy?
          </Text>
          <WorkoutTypeCard
            bgImage={require("@/assets/images/personalWorkout/velocity_home.png/")}
            title={"Velocidad - RSA"}
            href="/personalWorkouts/resistanceTraining/"
          />
          <WorkoutTypeCard
            bgImage={require("@/assets/images/personalWorkout/resistance_home.png")}
            title={"Resistencia"}
            href="/personalWorkouts/resistanceTraining/"
          />
          <WorkoutTypeCard
            bgImage={require("@/assets/images/personalWorkout/agility_home.png/")}
            title={"Agilidad y  Cambio de dirección"}
            href="/workouts/"
          />
        </VStack>
      )}
    </ScrollView>
  );
};

export default PersonalWorkouts;
