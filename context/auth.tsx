import {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { getData, removeData, storeData } from "@/utils/storage";
import { useRouter, useSegments, usePathname } from "expo-router";

import api from "@/queries/api";
import { User } from "@/types/user";
const AuthContext = createContext<any>(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken_] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isUserVerified = useMemo(() => {
    console.log("---", user, user?.isVerified);
    return user?.isVerified ?? false;
  }, [user]);

  //Cargamos el token del localstorage
  useEffect(() => {
    loadToken();
  }, []);

  //Actualizamos los datos del usuario cada vez que el token cambia.
  useEffect(() => {
    console.log("token", token, Boolean(token));
    if (token) loadUserProfile();
  }, [token]);

  //Determinar la rutas en base a si el usuario esta o no autenticado.
  useEffect(() => {
    /**
     * Caso 1: Usuario no esta logeado y queire acceder a una ruta protegida.
     * Caso 2: Usuario esta logeado pero no esta verificado.
     * Caso 3: Usuario logeado y verificado
     */
    if (token == null && rootSegment !== "(auth)") {
      router.replace("/(auth)/login");
    } else if (token && !isUserVerified && pathname !== "/verify-account") {
      router.replace("/home");
    } else if (token && isUserVerified) {
      router.replace("/home");
    }
  }, [token, rootSegment, isUserVerified]);

  //Obtener los datos del usuario.
  async function loadUserProfile() {
    try {
      const { data } = await api.get<User>("users/profile");
      setUser(data);
    } catch (error) {}
  }
  //Obtener token del localstorage.
  async function loadToken() {
    const token_ = await getData("token");
    console.log("loading token", token);
    setToken_(token_);
    if (token_ == null) return;
    api.defaults.headers.common.Authorization = `Token ${token_}`;
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
        user: user,
        loadUserProfile: loadUserProfile,
        token: token,
        setToken: handleSetToken,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
