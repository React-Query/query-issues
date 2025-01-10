import { Issues } from '../interfaces';
import { IssueItem } from './IssueItem';
interface Props {
  issues : Issues[]
}
//Tambien puede ser:
//const IssueList: FC<Props>
export const IssueList = ({issues}:Props) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4 border-2 border-green-500">
        <button className="btn active">All</button>
        <button className="btn">Open</button>
        <button className="btn">Closed</button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4 border-2 border-green-500">
        {
        issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue}/>
        ))
        }
      </div>
    </>
  );
};
