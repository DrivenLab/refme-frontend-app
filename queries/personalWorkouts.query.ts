import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";
import {
  PersonalWorkoutConfig,
  PersonalWorkoutDistance,
  PersonalWorkoutAbility,
} from "@/types/personalWorkouts";

const PW_QUERY_KEY = "personal-workouts-config";
const useGetPersonalWorkoutsConfigByType = ({
  ability,
}: {
  ability: PersonalWorkoutAbility;
}) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AxiosResponse<PersonalWorkoutConfig>>([
    PW_QUERY_KEY,
  ]);
  const personalWorkout =
    data?.data[ability] || ({} as PersonalWorkoutDistance);
  return { personalWorkout };
};

const useGetPersonalWorkoutsConfig = () => {
  //Get Data
  const getPersonalWorkoutsConfig = () => {
    return api.get<PersonalWorkoutConfig>(`workout-personal-configurations/`);
  };

  // Queries
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [PW_QUERY_KEY],
    queryFn: getPersonalWorkoutsConfig,
  });
  return {
    personalWorkoutsConfig: data?.data || ({} as PersonalWorkoutConfig),
    isLoadingPersonalWorkoutsConfig: isLoading,
  };
};

export { useGetPersonalWorkoutsConfig, useGetPersonalWorkoutsConfigByType };
