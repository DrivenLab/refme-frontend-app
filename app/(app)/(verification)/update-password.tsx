import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { NewPasswordData } from "@/types/user";
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
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Input as InputType } from "@/types/inputs";
import { useRouter, useSegments, usePathname } from "expo-router";
import { router } from "../../../.expo/types/router";
export default function UpdatePasswordScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<NewPasswordData>({
    new_password: "",
    repeat_password: "",
  } as NewPassword);
  const isBtnFormValid = useMemo(
    () =>
      Boolean(
        newPassword.new_password.length && newPassword.repeat_password.length
      ),
    [newPassword]
  );
  const [isLogging, setIsLogging] = useState(false);

  function handleOnChange(name: string, value: string) {
    setNewPassword((prev: NewPassword) => ({ ...prev, [name]: value }));
  }
  const handleLogin = async () => {
    if (newPassword.new_password != newPassword.repeat_password) {
      setError("Las contraseñas no coinciden.");
    }
    try {
      const { data } = await api.patch(`users/${user?.id}/`, {
        password: newPassword.new_password,
      });
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError("Usuario o Contraseña incorrectos.");
      else setError(i18n.t("generic_error"));
    } finally {
      router.push("/about-you");
    }
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
            label={i18n.t("new_password_label")}
            name="new_password"
            onChange={handleOnChange}
          />
          <CPasswordInput
            label={i18n.t("confirm_new_password_label")}
            name="repeat_password"
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
