import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { Workout } from "@/types/workout";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";
import { Session } from "@/types/session";

/*Esta función es la encargada de obtener los datos de una sesión en especifica del servidor y guardar en el storage. */
const useGetSessionDetailById = ({
  idSession,
  enabled,
}: {
  idSession: string | number;
  enabled: boolean;
}) => {
  const { currentOrganization } = useAuth();
  //Get Data

  const getSession = () =>
    api.get<Session>(
      `organizations/${currentOrganization.id}/sessions/${idSession}/`
    );
  // Queries

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sessions", idSession],
    queryFn: getSession,
    enabled,
  });

  return {
    session: data?.data,
    isLoadingSession: isLoading,
    refetchSession: refetch,
  };
};
/*Esta función obtiene los datos de una sessión, pero lo que está almacenado en el sessions query cache */
const useGetSessionById = ({ idWorkout }: { idWorkout: string | number }) => {
  const queryClient = useQueryClient();
  const { currentOrganization, userRole } = useAuth();

  const data = queryClient.getQueryData<AxiosResponse<Session[]>>(["sessions"]);

  let workout;
  if (userRole === "member") {
    workout = data?.data.find((s) => s.workout.id == idWorkout);
  } else {
    workout = data?.data.find((s) => s.id == idWorkout);
  }

  return { workout };
};
const useGetSessions = () => {
  const { currentOrganization, userRole } = useAuth();
  //Get Data
  const getSessions = () => {
    if (userRole === "member") {
      return api.get<Session[]>(
        `organizations/${currentOrganization.id}/sessions/`
      );
    } else {
      return api.get<Workout[]>(
        `organizations/${currentOrganization.id}/workouts/?usage_type=official`
      );
    }
  };
  // Queries
  // Realizar la consulta usando react-query
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["sessions"], // Asegúrate de invalidar y actualizar según el rol y la organización
    queryFn: getSessions,
  });
  return {
    sessions: data?.data || ([] as Session[]),
    isLoadingSession: isLoading,
  };
};

export { useGetSessionById, useGetSessions, useGetSessionDetailById };
