import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { LoginData } from "@/types/user";
import { baseURL } from "@/queries/api";
import axios from "axios";
import { Image } from "expo-image";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";

export default function LoginScreen() {
  const { setToken } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "gerardo.trainer@dlab.software",
    password: "12345",
  } as LoginData);
  const [error, setError] = useState("");
  const isBtnFormValid = useMemo(
    () => Boolean(loginData.email.length && loginData.password.length),
    [loginData]
  );
  const [isLogging, setIsLogging] = useState(false);
  function handleOnChange(name: string, value: string) {
    setLoginData((prev: LoginData) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async () => {
    setIsLogging(true);
    try {
      const { data } = await axios.post(
        `${baseURL}users/member_login/`,
        loginData
      );
      setToken(data.token);
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError(i18n.t("errors.login_invalid_credentials"));
      else setError(i18n.t("errors.generic_error"));
    } finally {
      setIsLogging(false);
    }
  };
  return (
    <SafeAreaView>
      <VStack space="md">
        <Image
          source={require("@/assets/images/login_bg.jpeg")}
          style={styles.login_referee_img}
          contentFit="cover"
        />
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

          <CTextInput
            placeholder={i18n.t("login_screen.email_label")}
            onChangeText={(value) => handleOnChange("email", value)}
            value={loginData.email}
          />
          <CTextInput
            placeholder={i18n.t("login_screen.password_label")}
            onChangeText={(value) => handleOnChange("password", value)}
            value={loginData.password}
            secureTextEntry
          />
          <CBtn
            title={i18n.t("login_screen.login_button")}
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
