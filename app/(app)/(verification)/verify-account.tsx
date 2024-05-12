import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { LoginData } from "@/types/user";
import CPasswordInput from "@/components/inputs/CPasswordInput";
import { baseURL } from "@/queries/api";
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
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";

import i18n from "@/languages/i18n";
import { Input as InputType } from "@/types/inputs";
import { useRouter, useSegments, usePathname } from "expo-router";

export default function VerifyAccountScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.firstName || "ad");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "admin@admin.com",
    password: "admin",
  } as LoginData);
  const isBtnFormValid = useMemo(
    () => Boolean(loginData.email.length && loginData.password.length),
    [loginData]
  );
  const [isLogging, setIsLogging] = useState(false);

  function handleOnChange(name: string, value: string) {
    console.log("Gg");
  }
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

        <VStack space="md" mt={50} paddingHorizontal={24}>
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
              placeholder="Nombre"
              onChangeText={setName}
              containerStyle={{ width: "50%" }}
              value={user?.firstName || ""}
              isDisabled
            />
            <CTextInput
              placeholder="Apellido"
              name="lastName"
              onChangeText={setName}
              onChange={handleOnChange}
              containerStyle={{ width: "50%" }}
              value={user?.lastName || ""}
              isDisabled
            />
          </HStack>

          <HStack space="md" mb={12}>
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              placeholder="Rol"
              name="role"
              onChangeText={setName}
              onChange={handleOnChange}
              value={profile ? profile[0].memberType : ""}
              containerStyle={{ width: "50%" }}
              isDisabled
            />
            <CTextInput
              placeholder="Categoria"
              name="category"
              onChangeText={setName}
              onChange={handleOnChange}
              containerStyle={{ width: "50%" }}
              value={profile ? profile[0]?.category.toString() : ""}
              isDisabled
            />
          </HStack>

          <CTextInput
            placeholder="Email"
            onChangeText={setName}
            onChange={handleOnChange}
            value={user?.email || ""}
            isDisabled
          />
          <CBtn
            isDisabled={!isBtnFormValid}
            title="Confirmar"
            isLoading={isLogging}
            onPress={handleLogin}
            mt={70}
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
    height: 200,
  },
  org_profile: {
    aspectRatio: 1,
    height: 120,
    width: "100%",
  },
  avatarContainer: {
    position: "absolute",
    top: 120, // Ajusta esto según tu diseño
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
