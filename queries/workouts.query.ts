import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

const useGetWotkouts = () => {
  //Get Data
  const getWorkout = () => api.get("organizations/2/workouts/");
  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkout,
  });
  return { workouts: data?.data, isLoadingWorkout: isLoading };
};

export default { useGetWotkouts };
