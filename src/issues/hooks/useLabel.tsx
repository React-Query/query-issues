import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";
import { Labels } from "../interfaces/labels.interface";

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: () => getLabels(),
    //COn el stale todos los componentes que usen el hook useLabs van a obtener los datos que ya se encuentran en el cache por una hora hasta que el staleTime temrine.
    staleTime: 1000 * 60 , //EL dato se mantendra una hora
    //!MIentras se cargan todos los labels mostramos uno ya definido con el placeholderData hasta que se recuperen del fetch y se mantengan persistentes segun el stale.
    // placeholderData: [
    //   {
    //     id: 791921801,
    //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     name: "❤️",
    //     color: "ffffff",
    //     default: false,
    //   } satisfies Labels,
    //   {
    //     id: 69105358,
    //     node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
    //     name: "Browser: Safari",
    //     color: "c7def8",
    //     default: false,
    //   } satisfies Labels,
    // ],

    //! esta es la data inicial y va a persistir segun lo que diga el staleTime
  //   initialData:[{
  //     id: 791921801,
  //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
  //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
  //     name: "❤️",
  //     color: "ffffff",
  //     default: false,
  //   } satisfies Labels,
  //   {
  //     id: 69105358,
  //     node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
  //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
  //     name: "Browser: Safari",
  //     color: "c7def8",
  //     default: false,
  //   } satisfies Labels,
  // ]
  });
  return { labelsQuery };
};
