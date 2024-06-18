import React from "react";

type ProgressBarProps = {
  calorie: number;
  totalCalorie: number;
  item: string;
};

const getColor = (progress: number): string => {
  if (progress < 50) {
    return "bg-red-500";
  } else if (progress < 75) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  calorie,
  totalCalorie,
  item,
}) => {
  const colorClass = getColor(calorie);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-medium text-gray-900 dark:text-gray-50">{item}</div>
      <div className="w-full max-w-md">
        <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full ${colorClass}`}
            style={{ width: `${calorie}%` }}
          />
        </div>
      </div>
      <div className="font-medium text-gray-500 dark:text-gray-400">
        {calorie}/{totalCalorie} calories
      </div>
    </div>
  );
};

export default ProgressBar;
