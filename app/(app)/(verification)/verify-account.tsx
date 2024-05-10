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
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Input as InputType } from "@/types/inputs";
import { useRouter, useSegments, usePathname } from "expo-router";

export default function VerifyAccountScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

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
    router.replace("/update-password");
  };
  return (
    <SafeAreaView>
      <VStack space="md">
        <Image
          source={require("@/assets/images/refme_logo.png")}
          style={styles.refme_logo}
          contentFit="contain"
        />
        <VStack space="md" paddingHorizontal={39}>
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
          <Text fontWeight="bold" fontSize={24} color="black">
            {i18n.t("welcome")}
          </Text>

          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              label="Nombre"
              name="name"
              onChange={handleOnChange}
              value={user?.firstName || ""}
              width="50%"
            />
            <CTextInput
              label="Apellido"
              name="lastName"
              onChange={handleOnChange}
              value={user?.lastName || ""}
              width="50%"
            />
          </HStack>

          <HStack space="md">
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            <CTextInput
              label="Rol"
              name="role"
              onChange={handleOnChange}
              value={profile ? profile[0].memberType : ""}
              width="50%"
            />
            <CTextInput
              label="Categoria"
              name="category"
              onChange={handleOnChange}
              value={profile ? profile[0]?.category.toString() : ""}
              width="50%"
            />
          </HStack>

          <CTextInput
            label="Email"
            name="email"
            onChange={handleOnChange}
            value={user?.email || ""}
          />
          <CBtn
            isDisabled={!isBtnFormValid}
            title="Confirmar"
            isLoading={isLogging}
            onPress={handleLogin}
            mt={30}
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
    height: 30,
    width: "100%",
    marginVertical: 30,
  },
});
