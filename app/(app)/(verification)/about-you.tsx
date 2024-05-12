import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
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
export default function AboutYouScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState<Profile>({
    birthdate: "",
    gender: "",
    passport: "",
    nationality: "",
    phoneNumber: "",
    address: "",
    weight: "",
    height: "",
    medical_expiration: "",
    medical_observations: "",
  } as Profile);
  const isBtnFormValid = useMemo(
    () => Boolean(profileData.birthdate.length && profileData.gender.length),
    [profileData]
  );
  const [isLogging, setIsLogging] = useState(false);

  function handleOnChange(name: string, value: string) {
    setProfileData((prev: Profile) => ({ ...prev, [name]: value }));
  }
  const handleUpdateProfile = async () => {
    if (profileData.new_password != profileData.repeat_password) {
      setError("Las contraseñas no coinciden.");
    }
    try {
      const { data } = await api.patch(
        `profiles/${profile[0]?.id}/`,
        profileData
      );
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError("Usuario o Contraseña inconrrectos.");
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
              name="birthdate"
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
            name="passport"
            onChangeText={(value) => handleOnChange("passport", value)}
            value={profileData.passport}
          />
          <CTextInput
            placeholder="Nacionalidad"
            name="nationality"
            onChangeText={(value) => handleOnChange("nationality", value)}
            value={profileData.nationality}
          />
          <CTextInput
            placeholder="Celular"
            name="phoneNumber"
            onChangeText={(value) => handleOnChange("phoneNumber", value)}
            value={profileData.phoneNumber}
          />

          <CTextInput
            placeholder="Direccion"
            name="address"
            onChangeText={(value) => handleOnChange("address", value)}
            value={profileData.address}
          />

          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder="Peso"
              name="weight"
              onChangeText={(value) => handleOnChange("weight", value)}
              value={profileData.weight}
              containerStyle={{ width: "50%" }}
            />
            <CTextInput
              placeholder="Altura"
              name="height"
              onChangeText={(value) => handleOnChange("height", value)}
              value={profileData.height}
              containerStyle={{ width: "50%" }}
            />
          </HStack>

          <CTextInput
            placeholder="Vecimiento ficha medica"
            name="medical_expiration"
            onChangeText={(value) =>
              handleOnChange("medical_expiration", value)
            }
            value={profileData.medical_expiration}
          />

          <CTextInput
            placeholder="Observaciones medicas"
            name="medical_observations"
            onChangeText={(value) =>
              handleOnChange("medical_observations", value)
            }
            value={profileData.medical_observations}
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
