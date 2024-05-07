import React from "react";
import { Workout } from "@/types/workout";
import {
  SafeAreaView,
  Text,
  Box,
  VStack,
  Divider,
  Badge,
  BadgeText,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import WorkoutConfigItem from "@/components/workouts/WorkoutConfigurationItem";
import WorkoutMaterial from "@/components/workouts/WorkoutMaterial";
import WorkoutTypeBadge from "@/components/workouts/WorkoutTypeBadge";
const WORKOUT: Workout = {
  id: 2,
  participants: [],
  iterations: [
    {
      id: 2,
      answers: [],
      createdAt: "2024-04-30T20:34:12.238750-04:00",
      modifiedAt: "2024-04-30T20:34:12.238768-04:00",
      isActive: true,
      repetitionNumber: 1,
      workout: 2,
    },
    {
      id: 3,
      answers: [],
      createdAt: "2024-04-30T20:34:12.239788-04:00",
      modifiedAt: "2024-04-30T20:34:12.239806-04:00",
      isActive: true,
      repetitionNumber: 2,
      workout: 2,
    },
    {
      id: 4,
      answers: [],
      createdAt: "2024-04-30T20:34:12.240880-04:00",
      modifiedAt: "2024-04-30T20:34:12.240899-04:00",
      isActive: true,
      repetitionNumber: 3,
      workout: 2,
    },
    {
      id: 5,
      answers: [],
      createdAt: "2024-04-30T20:34:12.241738-04:00",
      modifiedAt: "2024-04-30T20:34:12.241755-04:00",
      isActive: true,
      repetitionNumber: 4,
      workout: 2,
    },
    {
      id: 6,
      answers: [],
      createdAt: "2024-04-30T20:34:12.242612-04:00",
      modifiedAt: "2024-04-30T20:34:12.242630-04:00",
      isActive: true,
      repetitionNumber: 5,
      workout: 2,
    },
  ],
  createdAt: "2024-04-30T20:34:12.235797-04:00",
  modifiedAt: "2024-04-30T20:34:12.237076-04:00",
  isActive: true,
  name: "Entrenamiento Prueba Final",
  description: "Es el primer Entrenamiento de prueba con todo",
  memberType: "re",
  type: "dm",
  usageType: "official",
  material: "dos conos",
  numberOfRepetitions: 5,
  numberOfDecisions: 0,
  excerciseDuration: 5,
  breakDuration: 21,
  totalDuration: 130,
  isDraft: true,
  organization: 2,
};
const WorkoutDetail = () => {
  return (
    <SafeAreaView bg="white" flex={1} px="$3" py={"$2"}>
      <VStack space="md">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{i18n.t("sent_by")}</Text>
          <VStack flexDirection="row" alignItems="center" space="sm">
            <Text fontWeight="bold" color="black">
              Jesus Román
            </Text>
            <Text>13 mar</Text>
          </VStack>
        </Box>
        <VStack my="$3" space="sm">
          <Text fontSize={20} fontWeight="bold" color="black">
            {i18n.t("message")}
          </Text>
          <Text color="black">{WORKOUT.description}</Text>
        </VStack>
        <Divider />
        <VStack space="sm">
          <Text fontSize={20} fontWeight="bold" color="black">
            {i18n.t("cognitive_ability")}
          </Text>
          <VStack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <WorkoutTypeBadge type={i18n.t(WORKOUT.type)} />
            <Button variant="link">
              <ButtonText fontWeight="medium">Ver tutorial</ButtonText>
            </Button>
          </VStack>
        </VStack>
        <VStack mt="$2" space="sm">
          <Text fontSize={20} fontWeight="bold" color="black">
            Materiales
          </Text>
          <VStack flexDirection="row" space="md">
            <WorkoutMaterial name="5 conos" />
            <WorkoutMaterial name="1 cuerda" />
          </VStack>
        </VStack>
        <VStack mt="$2" space="md">
          <Text fontSize={20} fontWeight="bold" color="black">
            Configuración
          </Text>
          <WorkoutConfigItem
            configName="Repeticiones"
            quantity={WORKOUT.numberOfRepetitions}
          />
          <WorkoutConfigItem
            configName="Desiciones"
            quantity={WORKOUT.numberOfDecisions}
          />
          <WorkoutConfigItem
            configName="Tiempo de ejercicio"
            quantity={WORKOUT.excerciseDuration}
            inSeconds={true}
          />
          <WorkoutConfigItem
            configName="Tiempo de pausa"
            quantity={WORKOUT.breakDuration}
            inSeconds={true}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default WorkoutDetail;
