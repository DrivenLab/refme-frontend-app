import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";
import { User } from "@/types/user";
import { useAuth } from "@/context/auth";

const useGetProfile = () => {
  //Get Data
  const getUserProfile = () => api.get<User>(`users/profile/`);
  // Queries
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });
  return {
    profile: data?.data,
    isLoadingProfile: isLoading,
  };
};

//TODO: Filtrar por tipo de miembro, re o ra
const useGetMembers = () => {
  //Get Data
  const { currentOrganization } = useAuth();

  const getMembers = () => {
    return api.get<User[]>(`organizations/${currentOrganization.id}/members/`);
  };
  // Queries
  // Realizar la consulta usando react-query
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
  return {
    members: data?.data || ([] as User[]),
    isLoadingMember: isLoading,
  };
};

export { useGetProfile, useGetMembers };
