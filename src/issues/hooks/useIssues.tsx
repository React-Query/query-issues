import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";
import { useEffect, useState } from "react";
interface Props {
  statusState: State;
  selectedLabels: string[];
}

export const useIssues = ({ statusState, selectedLabels }: Props) => {
  console.log(statusState);
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery({
    //cuando se necesita enviar varios elementos en un Key y el orden no importa es recomendable enviarlo como un Objeto {}
    queryKey: ["issues", { statusState, selectedLabels, page }],
    queryFn: () => getIssues(statusState, selectedLabels, page),
    //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60, //EL dato se mantendra un minuto
  });
  //console.log(issuesQuery.data)
  //Cuando cambiamos de estado open|closed|all reseteamos el page a 1
  //Es conveniente usar efectos independientes para verificar diferentes dependencias.
  useEffect(() => {
    setPage(1);
  }, [statusState]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  const nextPage = () => {
    //Si no hay datos no nos movemos
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };
  const prevPage = () => {
    //si estamos en la pagina uno salimos
    if (page === 1) return;
    setPage((prevPage) => {
      return prevPage - 1;
    });
  };

  return { issuesQuery, page, nextPage, prevPage };
};
