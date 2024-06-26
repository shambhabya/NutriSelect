import React from "react";

type ProgressBarProps = {
  calorie: number;
  totalCalorie: number;
  item: string;
};

const getColor = (progress: number, totalCalorie: number): string => {
  if (progress < totalCalorie / 2) {
    return "bg-yellow-100";
  } else if (progress < (3 * totalCalorie) / 4) {
    return "bg-yellow-300";
  } else if (progress > totalCalorie) {
    return "bg-red-500";
  } else {
    return "bg-green-500";
  }
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  calorie,
  totalCalorie,
  item,
}) => {
  const colorClass = getColor(calorie, totalCalorie);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-medium text-gray-900 dark:text-gray-50">{item}</div>
      <div className="w-full max-w-md">
        <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full ${colorClass}`}
            style={{
              width: `${Math.min((calorie * 100) / totalCalorie, 100)}%`,
            }}
          />
        </div>
      </div>
      <div className="font-medium text-gray-500 dark:text-gray-400">
        {calorie}/{totalCalorie}{" "}
        {item === "Total Daily Calories" ? "calories" : "gm"}
      </div>
    </div>
  );
};

export default ProgressBar;
