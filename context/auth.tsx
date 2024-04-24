import { getData, removeData, storeData } from "@/utils/storage";
import { useRouter, useSegments } from "expo-router";
import * as React from "react";
const AuthContext = React.createContext<any>(null);
export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [token, setToken_] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadToken();
  }, []);
  //Determinar la rutas en base a si el usuario esta o no autenticado.
  React.useEffect(() => {
    if (token == null && rootSegment !== "(auth)") {
      router.replace("/(auth)/login");
    } else if (token && rootSegment !== "(app)") {
      router.replace("/");
    }
  }, [token, rootSegment]);

  //Obtener token del localstorage.
  async function loadToken() {
    const response = await getData("token");
    setToken_(response);
  }

  async function handleSignOut() {
    await removeData("token");
    setToken_(null);
  }
  async function handleSetToken(token: string) {
    await storeData({ name: "token", value: token });
    setToken_(token);
  }
  return (
    <AuthContext.Provider
      value={{
        token: token,
        setToken: handleSetToken,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
