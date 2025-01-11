import { useState } from "react";
import { LoadingSpinner } from "../../share/components";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

import { State } from "../interfaces";
import { useIssuesInfinite } from "../hooks";

export const ListViewInfinite = () => {
  const [statusIssue, setStatusIssue] = useState<State>(State.All);
  console.log(statusIssue);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  //console.log({ selectedLabels });
  const { issuesQueryInfinite } = useIssuesInfinite({
    statusState: statusIssue,
    selectedLabels: selectedLabels,
  });
  //pages es un array de array [[issue1,issue2],[issue3,issue4],[issue5,issue6]]
  // al aplanar queda asi [issue1,issue2,issue3,issue4,issue5,issue6]
  const issues = issuesQueryInfinite.data?.pages.flat() ?? [];

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
          {issuesQueryInfinite.isLoading ? (
            <LoadingSpinner />

          ) : (
            <div className="flex flex-col justify-center">
              <IssueList
                issues={issues}
                onStateChange={setStatusIssue}
                statusIssue={statusIssue}
              />
              <div className="flex justify-center items-center border-2 border-green-500">
                {/* <button
                onClick={()=>prevPage()}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                  Anteriores
                </button>
                <span>{page}</span> */}
                <button
                  disabled={issuesQueryInfinite.isFetchingNextPage}
                  onClick={() => {
                    console.log('next')
                    issuesQueryInfinite.fetchNextPage()}}
                  className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-500"
                >
                  {issuesQueryInfinite.isFetchingNextPage
                    ? "Cargando mas..."
                    : "cargar mas..."}
                </button>
              </div>
            </div>
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
