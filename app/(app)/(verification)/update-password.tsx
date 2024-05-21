import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { NewPasswordType } from "@/types/user";
import api from "@/queries/api";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";

import { useRouter } from "expo-router";

export default function UpdatePasswordScreen() {
  const [error, setError] = useState("");
  const { signOut, user, profile } = useAuth();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<NewPasswordType>({
    new_password: "",
    repeat_password: "",
  } as NewPasswordType);
  const isBtnFormValid = useMemo(
    () =>
      Boolean(
        newPassword.new_password.length && newPassword.repeat_password.length
      ),
    [newPassword]
  );
  const [isLogging, setIsLogging] = useState(false);

  function handleOnChange(name: string, value: string) {
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  }
  const handleLogin = async () => {
    if (newPassword.new_password != newPassword.repeat_password) {
      setError(i18n.t("errors.password_doesnt_match"));
    }
    try {
      const { data } = await api.patch(`users/${user?.id}/`, {
        password: newPassword.new_password,
      });
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError(i18n.t("errors.login_invalid_credentials"));
      else setError(i18n.t("errors.generic_error"));
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

          <CTextInput
            placeholder={i18n.t("new_password_label")}
            onChangeText={(value) => handleOnChange("new_password", value)}
            value={newPassword.new_password}
            secureTextEntry
          />
          <CTextInput
            placeholder={i18n.t("confirm_new_password_label")}
            onChangeText={(value) => handleOnChange("repeat_password", value)}
            value={newPassword.repeat_password}
            secureTextEntry
          />

          <CBtn
            isDisabled={!isBtnFormValid}
            title={i18n.t("common.confirm_label")}
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
