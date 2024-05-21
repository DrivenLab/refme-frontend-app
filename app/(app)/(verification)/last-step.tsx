import { useAuth } from "@/context/auth";

import { useState } from "react";
import api from "@/queries/api";
import { StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import {
  Box,
  Text,
  VStack,
  Avatar,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";

import * as ImagePicker from "expo-image-picker";

export default function LastStepScreen() {
  const [error, setError] = useState("");
  const { user, profile, loadUserProfile } = useAuth();
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);

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
    if (!image) {
      // TODO: Handle image null
      return;
    }
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
      else setError(i18n.t("errors.generic_error"));
    } finally {
      loadUserProfile();
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
              secondary
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
              secondary
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
