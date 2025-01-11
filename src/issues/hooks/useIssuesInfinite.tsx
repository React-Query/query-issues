import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";

interface Props {
  statusState: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ statusState, selectedLabels }: Props) => {
  console.log(statusState);

  const issuesQueryInfinite = useInfiniteQuery({
    //cuando se necesita enviar varios elementos en un Key y el orden no importa es recomendable enviarlo como un Objeto {}
    queryKey: ["issues", "infinite", { statusState, selectedLabels }],
    //queryFn: () => getIssues(statusState, selectedLabels, 1),

    queryFn: ({ pageParam, queryKey }) => {
      //desestructuramos ["issues", "infinite", { statusState, selectedLabels }] pero solo necesitamos el selectedLabels
      const [,,args] =queryKey
      const {statusState,selectedLabels} = args as Props
      return getIssues(statusState, selectedLabels, pageParam);
    },
    //Con el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60, //EL dato se mantendra un minuto
    initialPageParam: 0,
    //pages es un array de array [[issue1,issue2],[issue3,issue4],[issue5,issue6]]
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length > 0) {
        return lastPage.length + 1;
      } else {
        return undefined;
      }
    },
  });
  //console.log(issuesQuery.data)
  //Cuando cambiamos de estado open|closed|all reseteamos el page a 1
  //Es conveniente usar efectos independientes para verificar diferentes dependencias.
  return { issuesQueryInfinite };
};
