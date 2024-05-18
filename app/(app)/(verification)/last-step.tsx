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
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Input as InputType } from "@/types/inputs";
import { useRouter, useSegments, usePathname } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import { Button } from "@gluestack-ui/themed";

export default function LastStepScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", {
        uri: image,
        name: `profilePicture.${image.split(".").pop()}`,
        type: `image/${image.split(".").pop()}`,
      });
      const { data } = await api.patch(`users/${user?.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError("Usuario o Contraseña incorrectos.");
      else setError(i18n.t("generic_error"));
    } finally {
      router.push("/home");
    }
  };

  return (
    <VStack space="md">
      <VStack space="md" paddingHorizontal={24}>
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
          {i18n.t("add_profile_picture")}
        </Text>

        <View style={styles.avatarContainer}>
          <Avatar style={styles.org_profile}>
            <AvatarImage
              source={
                image
                  ? { uri: image }
                  : require("@/assets/images/profile_picture.png")
              }
              style={styles.org_profile}
              alt="Logo de la organización"
            />
          </Avatar>
        </View>
        {image ? (
          <>
            <CBtn
              title={i18n.t("finish")}
              onPress={handleUpdateProfile}
              mt={24}
            />

            <CBtn
              title={i18n.t("change_profile_picture")}
              onPress={pickImage}
              mt={24}
              bg="#F0f0f0"
            />
          </>
        ) : (
          <>
            <CBtn
              title={i18n.t("upload_profile_picture")}
              onPress={pickImage}
              mt={24}
            />

            <CBtn
              title={i18n.t("not_now")}
              onPress={handleUpdateProfile}
              mt={24}
              bg="#F0f0f0"
            />
          </>
        )}
      </VStack>
    </VStack>
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
  image: {
    width: 200,
    height: 200,
  },
  org_profile: {
    aspectRatio: 1,
    height: 200,
    width: "100%",
  },
  avatarContainer: {
    left: 0,
    right: 0,
    alignItems: "center",
    marginBottom: 24,
  },
});
