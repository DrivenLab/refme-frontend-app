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
import { Organization } from "@/types/organization";
import { useQueryClient } from "@tanstack/react-query";
import { User, Profile } from "@/types/user";
const AuthContext = createContext<any>(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);
  const clientQuery = useQueryClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const isUserVerified = useMemo(() => {
    return user?.isVerified ?? false;
  }, [user]);

  //Cargamos el token del localstorage
  useEffect(() => {
    loadToken();
  }, []);

  //Actualizamos los datos del usuario cada vez que el token cambia.
  useEffect(() => {
    if (token) {
      loadUserProfile();
      loadProfile();
    }
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
    } else if (token && isUserVerified) {
      router.replace("/home");
    } else if (token && !isUserVerified && pathname !== "/verify-account") {
      router.replace("/(verification)/verify-account");
    }
  }, [token, rootSegment, isUserVerified]);

  function handleSetUserOrganization(o: Organization) {
    setCurrentOrganization(o);
  }
  //Obtener los datos del usuario.
  async function loadUserProfile() {
    try {
      const { data } = await api.get<User>("users/profile");

      //console.log("loading user profile", data);
      setUser(data);
      //POR DEFAULT SE SETEA LA PRIMERA ORGANIZACION, ESTO CAMBIAR PARA QUE SEA LO QUE EL USUARIO SELECCIONE.
      handleSetUserOrganization(data.organizations[0]);
    } catch (error) {}
  }

  async function loadProfile() {
    try {
      const { data } = await api.get<Profile>("profiles");

      setProfile(data);
    } catch (error) {}
  }
  //Obtener token del localstorage.
  async function loadToken() {
    const token_ = await getData("token");
    console.log("loading token", token_);

    setToken(token_);
    if (token_ === null) return;
    api.defaults.headers.common.Authorization = `Token ${token_}`;
  }

  async function handleSignOut() {
    await removeData("token");
    console.log("signing out,aaaa");

    clientQuery.clear();
    setProfile(null);
    setUser(null);
    clientQuery.removeQueries({ queryKey: ["sessions"] });
    setToken(null);
  }
  async function handleSetToken(token_: string) {
    await storeData({ name: "token", value: token_ });
    api.defaults.headers.common.Authorization = `Token ${token_}`;

    setToken(token_);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loadUserProfile,
        currentOrganization,
        profile: profile,
        token: token,
        setToken: handleSetToken,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
