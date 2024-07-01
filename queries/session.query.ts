import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";
import { Session, SessionPostType } from "@/types/session";

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
      `organizations/${currentOrganization?.id}/sessions/${idSession}/`
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
const useGetSessionById = ({
  idSession,
  params,
}: {
  idSession: number;
  params?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<AxiosResponse<Session[]>>([
    "sessions",
    params,
  ]);
  const session = data?.data.find((s) => s.id === idSession);

  return { session };
};

/*Esta función obtiene los datos de todas las sesiones del servidor y las guarda en el query cache */
const useGetSessions = ({ params }: { params: Record<string, string> }) => {
  const { currentOrganization } = useAuth();
  //Get Data
  const getSessions = () => {
    return api.get<Session[]>(
      `organizations/${currentOrganization?.id}/sessions/`,
      { params }
    );
  };
  // Queries
  // Realizar la consulta usando react-query
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["sessions", params],
    queryFn: getSessions,
  });
  return {
    sessions: data?.data || ([] as Session[]),
    isLoadingSession: isLoading,
  };
};
const usePostSession = ({
  userId,
  workoutId,
}: {
  userId?: number;
  workoutId: number;
}) => {
  const { currentOrganization, user } = useAuth();
  const queryClient = useQueryClient();
  const _userId = userId || user?.id;
  const postSessionMutation = useMutation({
    mutationKey: ["sessions"],
    mutationFn: async (payload: SessionPostType[]) =>
      /*api.post(
        `organizations/${currentOrganization?.id}/users/${_userId}/workouts/${workoutId}/`,
        payload
      ),*/
      console.log("Post session mutation"),

    onMutate: async (payload: SessionPostType[]) => {
      //await queryClient.cancelQueries({ queryKey: ["sessions"] });
      console.log("onMutate");

      // updateLocalExerciseList(payload.id, payload.isDone, true);
      // TODO: Eliminar video
      // TODO: Marcar entrenamiento como completo en react query
    },
    onSuccess(data) {
      //queryClient.cancelQueries({ queryKey: ["sessions"] });
      //cleanWorkoutDownloadedVideos(workoutId);
      console.log("onSuccess");

      // updateLocalExerciseList(data.id, data.isDone, false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { postSessionMutation };
};

export {
  useGetSessionById,
  useGetSessions,
  useGetSessionDetailById,
  usePostSession,
};
