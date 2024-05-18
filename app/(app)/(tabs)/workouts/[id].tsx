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
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import WorkoutConfigItem from "@/components/workouts/WorkoutConfigurationItem";
import WorkoutMaterial from "@/components/workouts/WorkoutMaterial";
import WorkoutTypeBadge from "@/components/workouts/WorkoutTypeBadge";
import { useGetSessionById } from "@/queries/session.query";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { Link } from "expo-router";
import useSession from "@/hooks/useSession";
import DownloadProgressModal from "@/components/workouts/DownloadProgressModal";

const WorkoutDetail = () => {
  const { id: idSession } = useLocalSearchParams();
  const { session } = useGetSessionById({ idSession: idSession as string });
  const {
    downloadProgress,
    setIsDownloading,
    isDownloading,
    wasSessionDownlaoded,
    downloadSession,
  } = useSession({ idSession: Number(idSession as string) });
  const router = useRouter();
  const handleOnPress = () => {
    if (wasSessionDownlaoded)
      router.push("/workouts/startWorkout/" as Href<string>);
    else {
      downloadSession();
    }
  };
  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={() => setIsDownloading(false)}
        downloadProgress={downloadProgress}
      />
      <SafeAreaView bg="white" flex={1} px="$3" py={"$2"}>
        <ScrollView>
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
                <WorkoutTypeBadge
                  type={i18n.t(session?.workout?.type || "s")}
                />
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
          <Button
            onPress={handleOnPress}
            mt={"$3"}
            bg="$primary"
            rounded="$full"
            height={50}
          >
            <ButtonText color="black" fontWeight="medium">
              {wasSessionDownlaoded ? "Comenzar" : "Preparar"}
            </ButtonText>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default WorkoutDetail;
