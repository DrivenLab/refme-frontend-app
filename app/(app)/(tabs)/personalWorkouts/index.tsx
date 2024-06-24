import React from "react";
import { Text, ScrollView, VStack } from "@gluestack-ui/themed";

import i18n from "@/languages/i18n";

import WorkoutTypeCard from "@/components/personal-workouts/WorkoutTypeCard";

const PersonalWorkouts = () => {
  return (
    <ScrollView bgColor="white" px={"$3"} flex={1}>
      <VStack space="lg" flex={1} paddingBottom={10}>
        <Text my={"$5"} color="primary">
          ¿Qué habilidad necesitas trabajar hoy?
        </Text>
        <WorkoutTypeCard
          bgImage={require("@/assets/images/personalWorkout/velocity_home.png/")}
          title={"Velocidad - RSA"}
          href="/workouts/"
        />
        <WorkoutTypeCard
          bgImage={require("@/assets/images/personalWorkout/resistance_home.png")}
          title={"Resistencia"}
          href="/workouts/"
        />
        <WorkoutTypeCard
          bgImage={require("@/assets/images/personalWorkout/agility_home.png/")}
          title={"Agilidad y  Cambio de dirección"}
          href="/workouts/"
        />
      </VStack>
    </ScrollView>
  );
};

export default PersonalWorkouts;
