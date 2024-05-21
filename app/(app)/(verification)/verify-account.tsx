import { useAuth } from "@/context/auth";
import CTextInput, { DisableTextInput } from "@/components/inputs/CTextInput";
import { useState } from "react";
import { Image } from "expo-image";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";

import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";

export default function VerifyAccountScreen() {
  const [error, setError] = useState("");
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.firstName || "");

  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async () => {
    router.push("/update-password");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack style={{ flex: 1 }}>
        <Image
          source={require("@/assets/images/backgroud_refme.png")}
          style={styles.refme_logo}
          contentFit="cover"
        />
        {user && user.organizations && user.organizations.length > 0 ? (
          <>
            <View style={styles.avatarContainer}>
              <Avatar style={styles.org_profile}>
                <AvatarImage
                  source={
                    user.organizations[0].logoLink
                      ? user.organizations[0].logoLink
                      : require("@/assets/images/refme_logo.png")
                  }
                  style={styles.org_profile}
                  alt="Logo de la organización"
                />
              </Avatar>
            </View>
          </>
        ) : (
          <>
            <View style={styles.avatarContainer}>
              <Avatar style={styles.org_profile}>
                <AvatarImage
                  source={require("@/assets/images/profile_picture.png")}
                  style={styles.org_profile}
                  alt="Logo de la organización"
                />
              </Avatar>
            </View>
          </>
        )}

        <VStack space="md" mt={60} paddingHorizontal={24}>
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
          <Text fontWeight="bold" size="xl" color="#58DAFC">
            {i18n.t("welcome", { name: user?.fullName })}
          </Text>
          <Text color="black" size="sm">
            {i18n.t("confirm_personal_data")}
          </Text>
          <HStack space="md" mb={12}>
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder={i18n.t("common.name_label")}
              onChangeText={setName}
              containerStyle={{ width: "50%" }}
              value={user?.firstName || ""}
              isDisabled
            />
            <CTextInput
              placeholder={i18n.t("common.last_name_label")}
              onChangeText={setName}
              containerStyle={{ width: "50%" }}
              value={user?.lastName || ""}
              isDisabled
            />
          </HStack>

          <HStack space="md" mb={12}>
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <DisableTextInput
              placeholder={i18n.t("common.role_label")}
              value={profile && profile.length > 0 ? profile[0].memberType : ""}
              containerStyle={{ width: "50%" }}
            />
            <DisableTextInput
              placeholder={i18n.t("common.category_label")}
              containerStyle={{ width: "50%" }}
              value={profile ? profile[0]?.category.toString() : ""}
            />
          </HStack>

          <CTextInput
            placeholder={i18n.t("common.email_label")}
            onChangeText={setName}
            value={user?.email || ""}
            isDisabled
          />
          <CBtn
            title={i18n.t("common.confirm_label")}
            isLoading={isLogging}
            onPress={handleLogin}
            mt={70}
          />
          <CBtn
            title={"Logout"}
            isLoading={isLogging}
            onPress={signOut}
            secondary
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
    alignItems: "center",
    justifyContent: "center",
  },
  refme_logo: {
    height: 150,
    width: "100%",
    objectFit: "contain",
  },
  org_profile: {
    aspectRatio: 1,
    height: 120,
    width: "100%",
  },
  avatarContainer: {
    position: "absolute",
    top: 80, // Ajusta esto según tu diseño
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
