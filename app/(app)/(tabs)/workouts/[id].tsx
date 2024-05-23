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
import { useGetSessionById } from "@/queries/session.query";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import useSession from "@/hooks/useSession";
import { useSession as useSessionContext } from "@/context/SessionContext";
import DownloadProgressModal from "@/components/workouts/DownloadProgressModal";
import { useAuth } from "@/context/auth";
import CAlert from "@/components/CAlert";

const WorkoutDetail = () => {
  const { id: idSession } = useLocalSearchParams();
  const { userRole, currentOrganization } = useAuth();

  //const { workout } = useGetSessionById({ idWorkout: idWorkout as string });

  const {
    downloadProgress,
    setIsDownloading,
    isDownloading,
    wasSessionDownloaded,
    downloadSession,
    session,
  } = useSession({
    //idWorkout: Number(idWorkout),
    idSession: Number(idSession),
  });
  const { createSession } = useSessionContext();
  const router = useRouter();

  const handleOnPress = () => {
    if (wasSessionDownloaded && session) {
      createSession(session);
      if (userRole === "member")
        router.push("/workouts/startWorkout/" as Href<string>);
      else router.push("/workouts/assignReferee/" as Href<string>);
    } else {
      downloadSession();
    }
  };

  const workoutData = session?.workout;
  const date = session?.workout?.createdAt
    ? new Date(Date.parse(session?.workout?.createdAt))
    : new Date();
  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={() => setIsDownloading(false)}
        downloadProgress={downloadProgress}
      />
      <SafeAreaView bg="white" flex={1}>
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
              {workoutData?.name}
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
              <Text color="black">{workoutData?.description}</Text>
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
                <WorkoutTypeBadge type={i18n.t(workoutData?.type || "s")} />
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
                quantity={workoutData?.numberOfRepetitions}
              />
              <WorkoutConfigItem
                configName="Desiciones"
                quantity={workoutData?.numberOfDecisions}
              />
              <WorkoutConfigItem
                configName="Tiempo de ejercicio"
                quantity={workoutData?.excerciseDuration}
                inSeconds={true}
              />
              <WorkoutConfigItem
                configName="Tiempo de pausa"
                quantity={workoutData?.breakDuration}
                inSeconds={true}
              />
            </VStack>
          </VStack>
          <Button
            onPress={handleOnPress}
            mt={"$6"}
            bg="$primary"
            rounded="$full"
            height={50}
            mb={20}
          >
            <ButtonText color="black" fontWeight="medium">
              {wasSessionDownloaded ? "Comenzar" : "Preparar"}
            </ButtonText>
          </Button>
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
