import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";
import { User } from "@/types/user";

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

export { useGetProfile };
