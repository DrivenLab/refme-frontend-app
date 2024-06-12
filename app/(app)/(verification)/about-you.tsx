import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { CreateProfile } from "@/types/user";
import api from "@/queries/api";

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import CBtn from "@/components/CBtn";
import { Box, Text, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { DateTimePickerInput } from "@/components/inputs/DateTimePickerInput";

const GENRE_OPTIONS = [i18n.t("genre_options.m"), i18n.t("genre_options.f")];
const genreMapping = {
  [i18n.t("genre_options.m")]: "m",
  [i18n.t("genre_options.f")]: "f",
};
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
    expirationMedicalRecord: "",
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
    const _profileData = {
      ...profileData,
      gender: genreMapping[profileData.gender],
      expirationMedicalRecord: profileData.expirationMedicalRecord || null,
    };
    if (!profile) {
      return;
    }
    try {
      const { data } = await api.patch(
        `profiles/${profile[0]?.id}/`,
        _profileData
      );
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError(i18n.t("errors.login_invalid_credentials"));
      else setError(i18n.t("errors.generic_error"));
    } finally {
      router.dismissAll();
      router.replace("/last-step");
    }
  };
  const birthDateValue =
    profileData.birthdate.length === 10
      ? new Date(Date.parse(profileData.birthdate))
      : undefined;

  const medicalExpirationValue =
    profileData?.expirationMedicalRecord?.length === 10
      ? new Date(Date.parse(profileData.expirationMedicalRecord))
      : undefined;

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
            <DateTimePickerInput
              placeholder={i18n.t("about_you_screen.birthdate_label")}
              value={birthDateValue}
              onChange={(d: Date) =>
                handleOnChange("birthdate", d.toISOString().slice(0, 10))
              }
              containerStyle={{ width: "50%" }}
              required
            />
            <CTextInput
              placeholder={i18n.t("about_you_screen.genre_label")}
              containerStyle={{ width: "50%" }}
              onChangeText={(value) => handleOnChange("gender", value)}
              value={profileData.gender}
              options={GENRE_OPTIONS}
              required
            />
          </HStack>
          <CTextInput
            placeholder={i18n.t("about_you_screen.passport_label")}
            onChangeText={(value) => handleOnChange("passport", value)}
            value={profileData.passport}
          />
          <CTextInput
            placeholder={i18n.t("about_you_screen.nationality_label")}
            onChangeText={(value) => handleOnChange("nationality", value)}
            value={profileData.nationality}
          />
          <CTextInput
            placeholder={i18n.t("about_you_screen.phone_label")}
            onChangeText={(value) => handleOnChange("phoneNumber", value)}
            value={profileData.phoneNumber}
          />

          <CTextInput
            placeholder={i18n.t("about_you_screen.address_label")}
            onChangeText={(value) => handleOnChange("address", value)}
            value={profileData.address}
          />

          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder={i18n.t("about_you_screen.weight_label")}
              onChangeText={(value) => handleOnChange("weight", `${value}`)}
              value={profileData.weight}
              containerStyle={{ width: "50%" }}
              isNumberInput
            />
            <CTextInput
              placeholder={i18n.t("about_you_screen.height_label")}
              onChangeText={(value) => handleOnChange("height", `${value}`)}
              value={profileData.height}
              containerStyle={{ width: "50%" }}
              isNumberInput
            />
          </HStack>

          <DateTimePickerInput
            placeholder={i18n.t("about_you_screen.medical_expiration_label")}
            value={medicalExpirationValue}
            onChange={(d: Date) =>
              handleOnChange(
                "expirationMedicalRecord",
                d.toISOString().slice(0, 10)
              )
            }
          />
          <CTextInput
            placeholder={i18n.t("about_you_screen.medical_observations_label")}
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
