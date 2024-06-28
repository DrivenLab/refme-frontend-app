import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/auth";
import { Stats } from "@/types/stats";

/*Esta función obtiene los datos de todas las sesiones del servidor y las guarda en el query cache */
const useGetStats = () => {
  const { currentOrganization } = useAuth();
  //Get Data
  const getStats = () => {
    const res = api.get<Stats[]>(
      `organizations/${currentOrganization?.id}/stats/`
    );
    return res;
  };
  // Queries
  // Realizar la consulta usando react-query
  const { data, isLoading, isFetched, ...rest } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
  return {
    stats: data?.data || ([] as Stats[]),
    isLoadingStats: isLoading,
  };
};

export { useGetStats };
