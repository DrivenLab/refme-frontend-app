import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import CNumericInput from "@/components/inputs/CNumericInput";
import { useState } from "react";
import api from "@/queries/api";
import { Image } from "expo-image";

import { Platform, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
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
import { LinearGradient } from "expo-linear-gradient";
import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function CreateWorkoutScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile, currentOrganization } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [type, setType] = useState("");
  const [memberType, setMemberType] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [decisions, setDecisions] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(5);
  const [pauseTime, setPauseTime] = useState(20);

  const member_type_options = [i18n.t("referee"), i18n.t("assistant_referee")];
  const type_options = [
    i18n.t("decision_making"),
    i18n.t("memory"),
    i18n.t("recognition"),
    i18n.t("dm+memory"),
    i18n.t("random"),
  ];

  // Mapeo de valores de la interfaz a los valores reales
  const typeMapping = {
    [i18n.t("decision_making")]: "dm",
    [i18n.t("memory")]: "memory",
    [i18n.t("recognition")]: "recognition",
    [i18n.t("dm+memory")]: "dm+memory",
    [i18n.t("random")]: "random",
  };

  const memberTypeMapping = {
    [i18n.t("referee")]: "re",
    [i18n.t("assistant_referee")]: "ra",
  };

  const createWorkout = async () => {
    let finalType = typeMapping[type];
    if (type === i18n.t("decision_making")) {
      finalType = memberType === i18n.t("referee") ? "dm" : "dmar";
    }

    const workoutData = {
      name: workoutName,
      description: workoutName + new Date().toString(), // Actualiza según tu lógica
      memberType: memberTypeMapping[memberType],
      type: finalType,
      usageType: "official",
      material: "N/A",
      numberOfRepetitions: repetitions,
      numberOfDecisions: decisions,
      excerciseDuration: exerciseTime,
      breakDuration: pauseTime,
      isDraft: false,
    };

    if (!currentOrganization) {
      throw new Error("Current organization is null");
    }

    const { data } = await api.post(
      `organizations/${currentOrganization.id}/workouts/`,
      workoutData
    );

    return data;
  };

  const mutation = useMutation({
    mutationFn: createWorkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries("workouts");
      const idWorkout = data.id;
      router.replace(`/workouts/assignReferee/${idWorkout}`);
    },
    onError: (err) => {
      const error = err as AxiosError;
      setError(error.message || "Error, inténtelo más tarde.");
    },
  });

  const handleCreateWorkout = () => {
    setError("");
    mutation.mutate();
  };

  return (
    <SafeAreaView>
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
            {i18n.t("create_workout.create_new_workout")}
          </Text>
        </LinearGradient>
      </ImageBackground>
      <VStack space="md">
        <VStack space="md" paddingHorizontal={24} mb={50}>
          {error && (
            <Box
              bg="$red200"
              paddingHorizontal={10}
              paddingVertical={5}
              borderRadius={5}
            >
              <Text>{error}</Text>
            </Box>
          )}

          <CTextInput
            value={memberType}
            placeholder={i18n.t("create_workout.workout_name")}
            onChangeText={setWorkoutName}
            error=""
            containerStyle={{ marginTop: 20 }}
            width="100%"
          />

          <CTextInput
            value={memberType}
            placeholder={i18n.t("member_type")}
            onChangeText={setMemberType}
            options={member_type_options}
            error=""
            secureTextEntry={false}
            width="100%"
          />
          <CTextInput
            value={type}
            placeholder={i18n.t("type")}
            onChangeText={setType}
            options={type_options}
            error=""
            secureTextEntry={false}
            // containerStyle={}
            width="100%"
          />
          <Text fontWeight="bold" fontSize={24} color="black" mt={15}>
            {i18n.t("common.configuration")}
          </Text>

          <CNumericInput
            value={repetitions}
            placeholder={i18n.t("repetitions")}
            onChangeText={setRepetitions}
            error=""
            containerStyle={{ marginTop: 20 }}
            width="100%"
          />
          <CNumericInput
            value={decisions}
            placeholder={i18n.t("decisions")}
            onChangeText={setDecisions}
            error=""
            // containerStyle={}
            width="100%"
          />
          <CNumericInput
            value={exerciseTime}
            placeholder={i18n.t("exercise_time")}
            onChangeText={setExerciseTime}
            unity="s"
            error=""
            containerStyle={{ marginTop: 20 }}
            width="100%"
          />
          <CNumericInput
            value={pauseTime}
            placeholder={i18n.t("pause_time")}
            unity="s"
            onChangeText={setPauseTime}
            error=""
            // containerStyle={}
            width="100%"
          />
          <CBtn
            title={i18n.t("prepare")}
            onPress={handleCreateWorkout}
            mt={30}
            mb={300}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login_referee_img: {
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  refme_logo: {
    height: 30,
    width: "100%",
    marginVertical: 30,
  },
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
