import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { Workout } from "@/types/workout";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";

const useGetWorkoutById = ({ idWorkout }: { idWorkout?: string | number }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AxiosResponse<Workout[]>>(["workouts"]);

  const workout = data?.data.find((w) => w.id == idWorkout) || ({} as Workout);
  console.log("w----", workout, data?.data, idWorkout);
  return { workout };
};
const useGetWotkouts = () => {
  const { currentOrganization } = useAuth();
  console.log("currentOrganization", currentOrganization);
  //Get Data
  const getWorkout = () => api.get<Workout[]>(`organizations/5/workouts/`);
  // Queries
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkout,
  });
  return {
    workouts: data?.data || ([] as Workout[]),
    isLoadingWorkout: isLoading,
  };
};

export { useGetWotkouts, useGetWorkoutById };
