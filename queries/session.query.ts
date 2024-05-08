import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { Workout } from "@/types/workout";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";
import { Session } from "@/types/session";

const useGetSessionById = ({ idSession }: { idSession: string | number }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AxiosResponse<Session[]>>(["sessions"]);

  const session = data?.data.find((s) => s.id == idSession);
  console.log("w----", session, idSession);
  return { session };
};
const useGetSessions = () => {
  const { currentOrganization } = useAuth();
  //Get Data
  const getSessions = () =>
    api.get<Session[]>(`organizations/${currentOrganization.id}/sessions/`);
  // Queries
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
  console.log("heree----", rest);
  return {
    sessions: data?.data || ([] as Session[]),
    isLoadingSession: isLoading,
  };
};

export { useGetSessionById, useGetSessions };
