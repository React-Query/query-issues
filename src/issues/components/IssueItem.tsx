import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Issues, State } from "../interfaces";
import { FC } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";
import { timeSince } from "../../helpers";

interface Props {
  issue: Issues;
}
export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();

  const getQueryClient = useQueryClient(); //Va al context para buscar todo el queryClient
  const prefetchingData = () => {
    //console.log(`Precargando datos`)
    getQueryClient.prefetchQuery({
      queryKey: ["issues", issue.number], //tiene que ser el mismo del useIssue
      queryFn: () => getIssue(issue.number),
      staleTime: 60000, //para que no haga fetch a cada rato cuando pase el mouse, va a mantener los datos por 60 segundos.
    });

    getQueryClient.prefetchQuery({
      queryKey: ["issues", issue.number, "comments"], //tiene que ser el mismo del useIssue
      queryFn: () => getIssueComments(issue.number),
      staleTime: 60000, //para que no haga fetch a cada rato cuando pase el mouse, va a mantener los datos por 60 segundos.
    });
  };

  const presetData = () => {
    //grabamos en el cache ["issues", issue.number] para que sea mas rapdio aun en logar de hacer un prefetch
    //esto hara que el el hook useIssue(+issueNumber) dentro del componente IssueView ejecute el query pero ya los datos estan grabados en el cache con la queryKey ["issues", issue.number] y muestra directamente los dato y ya no hace la consulta http al api.
    getQueryClient.setQueryData(["issues", issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  };
  return (
    <div
      //onMouseEnter={prefetchingData}
      onMouseEnter={presetData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {
        //issue.state es un tipo de dato enum por ende hay que compararlo con el enum
        issue.state === State.Close ? (
          <FiInfo size={30} color="red" className="min-w-10" />
        ) : (
          <FiCheckCircle size={30} color="green" className="min-w-10" />
        )
      }

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {/* Suggestion: why not make accessing and changing the state possible
          globally? */}
          {issue.title}
        </a>
        <span className="text-gray-500">
          {/* Todo */}#{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>
        <div className="flex flex-wrap">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 mr-2 text-xs text-white rounded-md"
              style={{ border: `1px solid #${label.color}` }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
