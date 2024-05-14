import React from "react";
import {
  SafeAreaView,
  Text,
  Box,
  VStack,
  Divider,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import WorkoutConfigItem from "@/components/workouts/WorkoutConfigurationItem";
import WorkoutMaterial from "@/components/workouts/WorkoutMaterial";
import WorkoutTypeBadge from "@/components/workouts/WorkoutTypeBadge";
import { useGetWorkoutById } from "@/queries/workouts.query";
import { useGetSessionById } from "@/queries/session.query";
import { Href, useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

const WorkoutDetail = () => {
  const { id: idSession } = useLocalSearchParams();

  const { session } = useGetSessionById({ idSession: idSession as string });
  console.log("idSession", idSession);
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
          <Text color="black">{session?.workout?.description}</Text>
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
            <WorkoutTypeBadge type={i18n.t(session?.workout?.type || "s")} />
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
            quantity={session?.workout?.numberOfRepetitions}
          />
          <WorkoutConfigItem
            configName="Desiciones"
            quantity={session?.workout?.numberOfRepetitions}
          />
          <WorkoutConfigItem
            configName="Tiempo de ejercicio"
            quantity={session?.workout?.numberOfRepetitions}
            inSeconds={true}
          />
          <WorkoutConfigItem
            configName="Tiempo de pausa"
            quantity={session?.workout?.numberOfRepetitions}
            inSeconds={true}
          />
        </VStack>
      </VStack>
      <Link href={"/workouts/startWorkout/" as Href<string>} asChild>
        <Button mt={"$3"}>
          <ButtonText>Empezar Entrenamiento</ButtonText>
        </Button>
      </Link>
    </SafeAreaView>
  );
};

export default WorkoutDetail;
