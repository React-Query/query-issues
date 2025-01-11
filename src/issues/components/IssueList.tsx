import { Issues, State } from "../interfaces";
import { IssueItem } from "./IssueItem";
interface Props {
  issues: Issues[];
  onStateChange: (state: State) => void;
  statusIssue: State;
}
//Tambien puede ser:
//const IssueList: FC<Props>
export const IssueList = ({ issues, onStateChange, statusIssue }: Props) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4 border-2 border-green-500">
        <button
          onClick={() => onStateChange(State.All)}
          className={`btn ${statusIssue === State.All ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => onStateChange(State.Open)}
          className={`btn ${statusIssue === State.Open ? "active" : ""}`}
        >
          Open
        </button>
        <button
          onClick={() => onStateChange(State.Close)}
          className={`btn ${statusIssue === State.Close ? "active" : ""}`}
        >
          Closed
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4 border-2 border-green-500">
        {issues.map((issue,ix) => (
          <IssueItem key={ix} issue={issue} />
        ))}
      </div>
    </>
  );
};
