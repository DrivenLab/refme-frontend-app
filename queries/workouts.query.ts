import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { Workout } from "@/types/workout";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";
import { useGetSessionById } from "@/queries/session.query";

const useGetWorkoutById = ({ idWorkout }: { idWorkout: number }) => {
  const queryClient = useQueryClient();
  const { currentOrganization, userRole } = useAuth();
  let workout;

  //Si es miembro el id realmente es una Session , si es instructor, el id es Workout
  if (userRole === "member") {
    const { session } = useGetSessionById({
      idSession: Number(idWorkout as string),
    });
    workout = session?.workout;
  } else {
    const data = queryClient.getQueryData<AxiosResponse<Workout[]>>([
      "workouts",
    ]);

    workout = data?.data.find((w) => w.id === idWorkout);
  }

  return { workout };
};

/*Esta función obtiene los datos de todos los workouts de una organizacion del servidor y las guarda en el query cache */
const useGetWorkouts = () => {
  const { currentOrganization } = useAuth();

  //Get Data
  const getWorkouts = () => {
    return api.get<Workout[]>(
      `organizations/${currentOrganization.id}/workouts/`
    );
  };

  // Queries
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });
  return {
    workouts: data?.data || ([] as Workout[]),
    isLoadingWorkout: isLoading,
  };
};

export { useGetWorkouts, useGetWorkoutById };
