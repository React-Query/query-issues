import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { FiSkipBack } from "react-icons/fi";
import { useIssue } from "../hooks";
import { LoadingSpinner } from "../../share/components";
export { comment1, comment2, comment3 } from "../../helpers";

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  //console.log({ params });
  const issueNumber = params.issueNumber ?? 0;
  const { issueQuery, commentsQuery } = useIssue(+issueNumber);

  if (issueQuery.isLoading) {
    return <div>Cargando Issue...</div>;
  }
  //Si no hay datos o sea null o undefined redireccionamos al usario a un 404
  if (!issueQuery.data) {
    return <Navigate to={"/404"} />;
  }
  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros
      <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}

      {commentsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        commentsQuery.data?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}
    </div>
  );
};
