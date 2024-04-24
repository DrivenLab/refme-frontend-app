import { Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import { useState } from "react";
import { LoginData } from "@/types/user";
import CPasswordInput from "@/components/inputs/CPasswordInput";
import api, { baseURL } from "@/queries/api";
import axios from "axios";

export default function LoginScreen() {
  const { setToken } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "admin@admin.com",
    password: "admin",
  } as LoginData);
  const [isLoging, setIsLoging] = useState(false);
  function handleOnChange(name: string, value: string) {
    setLoginData((prev: LoginData) => ({ ...prev, [name]: value }));
  }
  const handleLogin = async () => {
    setIsLoging(true);
    try {
      const { data } = await axios.post(`${baseURL}users/login/`, loginData);
      await setToken(data.token);
    } catch (error) {
    } finally {
      setIsLoging(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <CTextInput
        placeholder="Email"
        name="email"
        onChange={handleOnChange}
        value={loginData.email}
      />
      <CPasswordInput
        placeholder="Contraseña"
        name="password"
        onChange={handleOnChange}
        value={loginData.password}
      />

      <Button title="Sign In" color={"orange"} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
