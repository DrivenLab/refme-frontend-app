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

export default function UpdatePasswordScreen() {
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
    setLoginData((prev: LoginData) => ({ ...prev, [name]: value }));
  }
  const handleLogin = async () => {
    router.replace("/home");
  };
  return (
    <SafeAreaView>
      <VStack space="md">
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
          <Text fontSize={14} color="black" marginTop={25} marginBottom={25}>
            {i18n.t("update_password")}
          </Text>

          <CPasswordInput
            label="Nueva Contra"
            name="newPassword"
            onChange={handleOnChange}
          />
          <CPasswordInput
            label="Repetir Contra"
            name="repeatNewPassword"
            onChange={handleOnChange}
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
