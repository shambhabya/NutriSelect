import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";
import { useMyDietContext } from "@/context/myDietContext";
import { useDietContext } from "@/context/dietDataContext";

const DietBard: React.FC<any> = ({
  calorieCount,
  totalRequiredCalories,
  dietTime,
}) => {
  const { myDiet } = useMyDietContext();
  const { dietItems } = useDietContext();
  const [completedCalorie, setCompletedCalorie] = useState({
    completedTotalCalorie: 0,
    completedFats: 0,
    completedProtein: 0,
    completedCarbs: 0,
  });

  useEffect(() => {
    console.log("myDiet-", myDiet);
  }, [myDiet]);
  return (
    <div className="">
      <div className="flex flex-col gap-10 px-10">
        <ProgressBar
          calorie={completedCalorie.completedTotalCalorie}
          totalCalorie={totalRequiredCalories}
          item="Total Daily Calories"
        />
        <div className="flex justify-center">
          <div className=" underline text-slate-500">{dietTime} Calories</div>
        </div>
        <ProgressBar
          calorie={completedCalorie.completedFats}
          totalCalorie={Math.round(calorieCount.requiredFats / 9)}
          item="Fats"
        />
        <ProgressBar
          calorie={completedCalorie.completedProtein}
          totalCalorie={Math.round(calorieCount.requiredProtein / 4)}
          item="Protein"
        />
        <ProgressBar
          calorie={completedCalorie.completedCarbs}
          totalCalorie={Math.round(calorieCount.requiredCarbs / 4)}
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
