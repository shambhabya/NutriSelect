import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";
import { useDietContext } from "@/context/dietDataContext";

const DietBard: React.FC<any> = ({
  calorieCount,
  totalRequiredCalories,
  totalRequiredCaloriedCompleted,
  dietTime,
}) => {
  const { dietItems } = useDietContext();
  return (
    <div className="">
      <div className="flex flex-col gap-10 px-10">
        <ProgressBar
          calorie={totalRequiredCaloriedCompleted}
          totalCalorie={totalRequiredCalories}
          item="Total daily Calories"
        />
        <div className="flex justify-center">
          <div className=" underline text-slate-500">{dietTime} Calories</div>
        </div>
        <ProgressBar
          calorie={calorieCount.completedFats}
          totalCalorie={calorieCount.requiredFats}
          item="Fats"
        />
        <ProgressBar
          calorie={calorieCount.completedProtein}
          totalCalorie={calorieCount.requiredProtein}
          item="Protein"
        />
        <ProgressBar
          calorie={calorieCount.completedCarbs}
          totalCalorie={calorieCount.requiredCarbs}
          item="Carbs"
        />
        <div className="flex justify-center ">
          <Button>Diet Chart</Button>
        </div>
      </div>
    </div>
  );
};

export default DietBard;
