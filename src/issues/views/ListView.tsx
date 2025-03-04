import { useState } from "react";
import { LoadingSpinner } from "../../share/components";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../interfaces";

export const ListView = () => {
  const [statusIssue, setStatusIssue] = useState<State>(State.All);
  console.log(statusIssue);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  console.log({ selectedLabels });
  const { issuesQuery,page ,nextPage,prevPage } = useIssues({
    statusState: statusIssue,
    selectedLabels: selectedLabels,
  });
  const issues = issuesQuery.data ?? [];

  const onSelectedLabels = (label: string) => {
    //Si ya existe el label se lo elimina
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <>
      {/* <div>{state}</div> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 border-2 border-white">
        <div className="col-span-1 sm:col-span-2">
          {issuesQuery.isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <IssueList
                issues={issues}
                onStateChange={setStatusIssue}
                statusIssue={statusIssue}
              />
              <div className="flex justify-between items-center border-2 border-green-500">
                <button
                onClick={()=>prevPage()}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                  Anteriores
                </button>
                <span>{page}</span>
                <button
                onClick={()=>nextPage()}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                  Siguientes
                </button>
              </div>
            </>
          )}
        </div>

        <div className="col-span-1 px-2">
          <LabelPicker
            onSelectedLabels={onSelectedLabels}
            selectedLabels={selectedLabels}
          />
        </div>
      </div>
    </>
  );
};
