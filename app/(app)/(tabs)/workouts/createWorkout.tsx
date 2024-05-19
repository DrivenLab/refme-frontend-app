import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import CNumericInput from "@/components/inputs/CNumericInput";
import { useMemo, useState } from "react";
import { Profile } from "@/types/user";
import CPasswordInput from "@/components/inputs/CPasswordInput";
import { baseURL } from "@/queries/api";
import api from "@/queries/api";
import axios from "axios";
import { Image } from "expo-image";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  InputField,
  ScrollView,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Input as InputType } from "@/types/inputs";
import { useRouter, useSegments, usePathname } from "expo-router";
export default function CreateWorkoutScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

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

  function handleOnChange(name: string, value: string) {
    setProfileData((prev: Profile) => ({ ...prev, [name]: value }));
  }
  const handleCreateWorkout = async () => {
    console.log(type, memberType);
  };
  const handleRepetitionsChange = (text: string) => {
    setRepetitions(parseInt(text)); // Asegúrate de convertir el texto a un número entero
  };
  const handleDecisionsChange = (text: string) => {
    setDecisions(parseInt(text)); // Asegúrate de convertir el texto a un número entero
  };
  const handleExerciseTimeChange = (text: string) => {
    setExerciseTime(parseInt(text)); // Asegúrate de convertir el texto a un número entero
  };
  const handlePauseTimeChange = (text: string) => {
    setPauseTime(parseInt(text)); // Asegúrate de convertir el texto a un número entero
  };

  return (
    <ScrollView style={styles.container} px={"$3"}>
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
            containerStyle={(styles.inputContainer, { marginTop: 20 })}
            width="100%"
          />
          <CTextInput
            value={type}
            placeholder={i18n.t("type")}
            onChangeText={setType}
            options={type_options}
            error=""
            secureTextEntry={false}
            containerStyle={styles.inputContainer}
            width="100%"
          />
          <Text fontWeight="bold" fontSize={24} color="black" mt={15}>
            {i18n.t("configuration")}
          </Text>

          <CNumericInput
            value={repetitions}
            placeholder={i18n.t("repetitions")}
            onChangeText={handleRepetitionsChange}
            error=""
            containerStyle={(styles.inputContainer, { marginTop: 20 })}
            width="100%"
          />
          <CNumericInput
            value={decisions}
            placeholder={i18n.t("decisions")}
            onChangeText={setDecisions}
            error=""
            containerStyle={styles.inputContainer}
            width="100%"
          />
          <CNumericInput
            value={exerciseTime}
            placeholder={i18n.t("exercise_time")}
            onChangeText={handleExerciseTimeChange}
            error=""
            containerStyle={(styles.inputContainer, { marginTop: 20 })}
            width="100%"
          />
          <CNumericInput
            value={pauseTime}
            placeholder={i18n.t("pause_time")}
            onChangeText={handlePauseTimeChange}
            error=""
            containerStyle={styles.inputContainer}
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
    </ScrollView>
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
