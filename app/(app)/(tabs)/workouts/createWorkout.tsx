import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import CNumericInput from "@/components/inputs/CNumericInput";
import { useState } from "react";
import api from "@/queries/api";
import { Image } from "expo-image";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import { Box, Text, VStack } from "@gluestack-ui/themed";
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
  const [repetitions, setRepetitions] = useState(0);
  const [decisions, setDecisions] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);

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
      name: "Workout in APP " + new Date().toString(),
      description: "Workout Description", // Actualiza según tu lógica
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
      queryClient.invalidateQueries("sessions");
      const idWorkout = data.id;
      router.replace(`/workouts/${idWorkout}/`);
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
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 100, width: "100%" }}
      />
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
            placeholder={i18n.t("member_type")}
            onChangeText={setMemberType}
            options={member_type_options}
            error=""
            secureTextEntry={false}
            containerStyle={{ marginTop: 20 }}
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
            {i18n.t("configuration")}
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
});
