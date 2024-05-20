import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { CreateProfile } from "@/types/user";
import api from "@/queries/api";

import { StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import { Box, Text, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";

import { useRouter } from "expo-router";
export default function AboutYouScreen() {
  const [error, setError] = useState("");
  const { profile } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState<CreateProfile>({
    birthdate: "",
    gender: "",
    passport: "",
    nationality: "",
    phoneNumber: "",
    address: "",
    weight: 0,
    height: 0,
    medicalExpiration: "",
    medicalObservations: "",
  });
  const isBtnFormValid = useMemo(
    () => Boolean(profileData.birthdate.length && profileData.gender.length),
    [profileData]
  );
  const [isLogging, setIsLogging] = useState(false);

  function handleOnChange(name: string, value: string) {
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }
  const handleUpdateProfile = async () => {
    if (!profile) {
      return;
    }
    try {
      const { data } = await api.patch(
        `profiles/${profile[0]?.id}/`,
        profileData
      );
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError("Usuario o Contraseña incorrectos.");
      else setError(i18n.t("generic_error"));
    } finally {
      router.push("/last-step");
    }
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
          <Text fontSize={14} color="black" marginTop={25} marginBottom={25}>
            {i18n.t("about_you")}
          </Text>
          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder="Nacimiento"
              onChangeText={(value) => handleOnChange("birthdate", value)}
              containerStyle={{ width: "50%" }}
              value={profileData.birthdate}
            />
            <CTextInput
              placeholder="Genero"
              containerStyle={{ width: "50%" }}
              onChangeText={(value) => handleOnChange("gender", value)}
              value={profileData.gender}
            />
          </HStack>
          <CTextInput
            placeholder="Pasaporte"
            onChangeText={(value) => handleOnChange("passport", value)}
            value={profileData.passport}
          />
          <CTextInput
            placeholder="Nacionalidad"
            onChangeText={(value) => handleOnChange("nationality", value)}
            value={profileData.nationality}
          />
          <CTextInput
            placeholder="Celular"
            onChangeText={(value) => handleOnChange("phoneNumber", value)}
            value={profileData.phoneNumber}
          />

          <CTextInput
            placeholder="Direccion"
            onChangeText={(value) => handleOnChange("address", value)}
            value={profileData.address}
          />

          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder="Peso"
              onChangeText={(value) => handleOnChange("weight", value)}
              value={profileData.weight}
              containerStyle={{ width: "50%" }}
            />
            <CTextInput
              placeholder="Altura"
              onChangeText={(value) => handleOnChange("height", value)}
              value={profileData.height}
              containerStyle={{ width: "50%" }}
            />
          </HStack>

          <CTextInput
            placeholder="Vecimiento ficha medica"
            onChangeText={(value) => handleOnChange("medicalExpiration", value)}
            value={profileData.medicalExpiration}
          />

          <CTextInput
            placeholder="Observaciones medicas"
            onChangeText={(value) =>
              handleOnChange("medicalObservations", value)
            }
            value={profileData.medicalObservations}
          />

          <CBtn
            isDisabled={!isBtnFormValid}
            title={i18n.t("update_info")}
            isLoading={isLogging}
            onPress={handleUpdateProfile}
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
