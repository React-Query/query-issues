import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";


export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn:getIssues,
    //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60 , //EL dato se mantendra un minuto
    
  });
  //console.log(issuesQuery.data)
  return { issuesQuery };
};