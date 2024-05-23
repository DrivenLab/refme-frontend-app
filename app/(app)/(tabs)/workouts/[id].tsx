import React from "react";
import {
  SafeAreaView,
  Text,
  Box,
  VStack,
  Divider,
  Button,
  ButtonText,
  ScrollView,
  ImageBackground,
} from "@gluestack-ui/themed";
import { Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "@/languages/i18n";
import WorkoutConfigItem from "@/components/workouts/WorkoutConfigurationItem";
import WorkoutMaterial from "@/components/workouts/WorkoutMaterial";
import WorkoutTypeBadge from "@/components/workouts/WorkoutTypeBadge";
import { useGetWorkoutById } from "@/queries/workouts.query";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import useSession from "@/hooks/useSession";
import { useSession as useSessionContext } from "@/context/SessionContext";
import { useAuth } from "@/context/auth";
import CAlert from "@/components/CAlert";
import WorkoutMemberDetail from "@/components/workouts/WorkoutMemberDetail";
import WorkoutInstructorDetail from "@/components/workouts/WorkoutInstructorDetail";

const WorkoutDetail = () => {
  //TODO solo id
  const { id: id } = useLocalSearchParams();
  const { userRole, currentOrganization } = useAuth();
  const idWorkout = id;
  const { workout } = useGetWorkoutById({
    idWorkout: Number(idWorkout as string),
  });
  console.log("Aa");

  const date = workout?.createdAt
    ? new Date(Date.parse(workout.createdAt))
    : new Date();

  return (
    <>
      <SafeAreaView bg="white" flex={1} px="$3" py={"$2"}>
        <ImageBackground
          source={require("@/assets/images/workout_banner.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient // Background Linear Gradient
            colors={["#090B22", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.backgroundLinearGradient}
          >
            <Text color="white" px="$3" fontSize="$lg" bold>
              {workout?.name}
            </Text>
          </LinearGradient>
        </ImageBackground>

        <ScrollView px="$3" pt={Platform.OS === "android" ? 10 : "$2"}>
          <VStack space="md">
            <CAlert text={i18n.t("workout_flow.official_training_alert")} />
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop={"$2"}
            >
              <Text>{i18n.t("sent_by")}</Text>
              <VStack flexDirection="row" alignItems="center" space="sm">
                <Text fontWeight="bold" color="black">
                  {`${currentOrganization?.contactName} ${currentOrganization?.contactLastName}`}
                </Text>
                <Text>
                  {date.toLocaleDateString("es-PY", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </VStack>
            </Box>
            <VStack my="$3" space="sm">
              <Text fontSize={20} fontWeight="bold" color="black">
                {i18n.t("message")}
              </Text>
              <Text color="black">{workout?.description}</Text>
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
                <WorkoutTypeBadge type={i18n.t(workout?.type || "s")} />
                <Button variant="link">
                  <ButtonText fontWeight="medium">
                    {i18n.t("workout_flow.watch_tutorial_label")}
                  </ButtonText>
                </Button>
              </VStack>
            </VStack>
            <VStack mt="$2" space="sm">
              <Text fontSize={20} fontWeight="bold" color="black">
                {i18n.t("workout_flow.materials_title")}
              </Text>
              <VStack flexDirection="row" space="md">
                <WorkoutMaterial name="5 conos" />
                <WorkoutMaterial name="1 cuerda" />
              </VStack>
            </VStack>
            <VStack mt="$2" space="md">
              <Text fontSize={20} fontWeight="bold" color="black">
                {i18n.t("common.configuration")}
              </Text>
              <WorkoutConfigItem
                configName="Repeticiones"
                quantity={workout?.numberOfRepetitions}
              />
              <WorkoutConfigItem
                configName="Desiciones"
                quantity={workout?.numberOfDecisions}
              />
              <WorkoutConfigItem
                configName="Tiempo de ejercicio"
                quantity={workout?.excerciseDuration}
                inSeconds={true}
              />
              <WorkoutConfigItem
                configName="Tiempo de pausa"
                quantity={workout?.breakDuration}
                inSeconds={true}
              />
            </VStack>
          </VStack>
          {userRole === "member" ? (
            <WorkoutMemberDetail idSession={id} />
          ) : (
            <WorkoutInstructorDetail />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default WorkoutDetail;
const styles = StyleSheet.create({
  backgroundLinearGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backgroundImage: {
    height: 80,
    width: "100%",
    // flex: 1,
    overflow: "hidden",
  },
});
