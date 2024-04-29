import { VStack, Text, ButtonSpinner } from "@/theme/components";
import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useMemo, useState } from "react";
import { LoginData } from "@/types/user";
import CPasswordInput from "@/components/inputs/CPasswordInput";
import api, { baseURL } from "@/queries/api";
import { Button, ButtonText, ButtonIcon, AddIcon } from "@/theme/components";
import { ChevronRight, MoveRightIcon } from "lucide-react-native";
import axios from "axios";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function LoginScreen() {
  const { setToken } = useAuth();
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
    setIsLogging(true);
    try {
      console.log("lgin");
      const { data } = await axios.post(`${baseURL}users/login/`, loginData);
      await setToken(data.token);
      console.log("lgin---", data.token);
    } catch (error) {
    } finally {
      setIsLogging(false);
    }
  };
  return (
    <VStack backgroundColor="white" space="lg" flexDirection="column" flex={1}>
      <Image
        style={styles.login_referee_img}
        source="assets/images/login_referee.png"
        contentFit="cover"
      />
      <Image
        style={styles.image}
        source="assets/images/refme_logo.png"
        contentFit="contain"
      />
      <VStack
        flexGrow={1}
        width={"100%"}
        backgroundColor="white"
        space="md"
        paddingHorizontal={20}
        marginTop={"$12"}
      >
        <CTextInput
          placeholder="Ingrese su correo"
          name="email"
          label="Correo"
          onChange={handleOnChange}
          value={loginData.email}
        />
        <CPasswordInput
          placeholder="Ingrese su contraseña"
          label="Contraseña"
          name="password"
          onChange={handleOnChange}
          value={loginData.password}
        />
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={!isBtnFormValid}
          isFocusVisible={isLogging}
          rounded={"$full"}
          marginTop={20}
          onPress={handleLogin}
        >
          {isLogging ? (
            <ButtonSpinner mr="$1" />
          ) : (
            <>
              <ButtonText>Ingresar </ButtonText>
              <ButtonIcon as={ChevronRight} />
            </>
          )}
        </Button>
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 30,
    width: "100%",
  },
});
