import { FC } from "react";
import { LoadingSpinner } from "../../share/components";
import { useLabels } from "../hooks";

interface Props {
  onSelectedLabels: (label: string) => void;
  selectedLabels: string[];
}

export const LabelPicker: FC<Props> = ({
  onSelectedLabels,
  selectedLabels,
}) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 justify-center border-2 border-green-500">
      {labelsQuery.data?.map((label) => (
        <span
          onClick={() => {
            onSelectedLabels(label.name);
          }}
          key={label.id}
          className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white ${
            selectedLabels.includes(label.name) ? "selected-label" : ""
          }`}
          style={{ border: `1px solid #${label.color}`, color: "#ffccd3" }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
