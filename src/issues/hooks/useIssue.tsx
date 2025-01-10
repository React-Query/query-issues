import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    //Para identificar el issue en particular evaluando su equidad
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60, //EL dato se mantendra un minuto,
    //AL primer fallo ya no reitenta, colocamos esta opcion en el queryCliente del componente main
    //retry: false,
  });

  //console.log(issueQuery.data)
  
  // const commentsQuery = useQuery({
  //   //Para identificar el issue en particular evaluando su equidad
  //   queryKey: ["issues", issueNumber,'comments'],
  //   queryFn: () => getIssueComments(issueNumber),
  //   //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
  //   staleTime: 1000 * 60, //EL dato se mantendra un minuto,
  //   //AL primer fallo ya no reitenta, colocamos esta opcion en el queryCliente del componente main
  //   //retry: false,
  // });

  //! EN caso de que se necesite que el commentsQuery se ejecute dependiendo de la ejecucion del issueQuery:
  const issueQueryNumber=issueQuery.data?.number
  const commentsQuery = useQuery({
    //Para identificar el issue en particular evaluando su equidad
    queryKey: ["issues", issueQueryNumber,'comments'],
    queryFn: () => getIssueComments(issueQueryNumber!),
    //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60, //EL dato se mantendra un minuto,
    //AL primer fallo ya no reitenta, colocamos esta opcion en el queryCliente del componente main
    //retry: false,
    enabled: issueQuery.data !== undefined // SI hay datos no es undefined
  });
  
  
  return { issueQuery,commentsQuery };
};
