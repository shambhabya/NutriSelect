import React, { useEffect, useState } from "react";
import DietBar from "./DietBar";
import DietOptions from "./DietOptions";
import { useDietContext } from "@/context/dietDataContext";
import { useMyDietContext } from "@/context/myDietContext";

const DietPlanner = () => {
  const { dietItems } = useDietContext();
  const [dietTime, setDietTime] = useState("morning");
  const [calorieCount, setTotalCalorieCount] = useState({
    totalRequiredCalories: 0,
    totalRequiredCaloriedCompleted: 0,
    breakfast: {
      requiredFats: 0,
      completedFats: 0,
      requiredProtein: 0,
      completedProtein: 0,
      requiredCarbs: 0,
      completedCarbs: 0,
    },
    lunch: {
      requiredFats: 0,
      completedFats: 0,
      requiredProtein: 0,
      completedProtein: 0,
      requiredCarbs: 0,
      completedCarbs: 0,
    },
    dinner: {
      requiredFats: 0,
      completedFats: 0,
      requiredProtein: 0,
      completedProtein: 0,
      requiredCarbs: 0,
      completedCarbs: 0,
    },
  });

  //   useEffect(() => {
  //     const {
  //       totalCaloricIntake,
  //       proteinCalorieIntake,
  //       carbsCalorieIntake,
  //       fatsCalorieIntake,
  //     } = dietItems;
  //     setTotalCalorieCount({
  //       totalRequiredCalories: totalCaloricIntake,
  //       totalRequiredCaloriedCompleted: 0,
  //       breakfast: {
  //         requiredFats: Math.round(0.3 * fatsCalorieIntake),
  //         completedFats: 0,
  //         requiredProtein: Math.round(0.3 * proteinCalorieIntake),
  //         completedProtein: 0,
  //         requiredCarbs: Math.round(0.3 * carbsCalorieIntake),
  //         completedCarbs: 0,
  //       },
  //       lunch: {
  //         requiredFats: Math.round(0.35 * fatsCalorieIntake),
  //         completedFats: 0,
  //         requiredProtein: Math.round(0.35 * proteinCalorieIntake),
  //         completedProtein: 0,
  //         requiredCarbs: Math.round(0.35 * carbsCalorieIntake),
  //         completedCarbs: 0,
  //       },
  //       dinner: {
  //         requiredFats: Math.round(0.35 * fatsCalorieIntake),
  //         completedFats: 0,
  //         requiredProtein: Math.round(0.35 * proteinCalorieIntake),
  //         completedProtein: 0,
  //         requiredCarbs: Math.round(0.35 * carbsCalorieIntake),
  //         completedCarbs: 0,
  //       },
  //     });
  //   }, [dietItems]);

  return (
    <div className=" h-screen ">
      <div className="py-2 px-10 text-2xl font-bold text-red-400">
        Diet Planner
      </div>
      <div className="pb-2 px-10 ">
        Your calculated BMI is {dietItems.bmi}, which shows you are
        {dietItems.interpretation}. Based on your BMI and calculated BMR, your
        daily calorie need is {dietItems.totalCaloricIntake} calories, which
        will help to keep you maintain a healthy and fit body.
      </div>
      <div className="flex w-full px-10 h-4/5">
        <div className="flex flex-col w-5/6 bg-white mr-1 my-3  rounded-lg border-2">
          <div className="flex justify-between ">
            <div
              className=" bg-slate-200 py-2 pl-28 w-full border-b-2 border-r cursor-pointer"
              onClick={() => setDietTime("morning")}
            >
              Breakfast
            </div>
            <div
              className=" bg-slate-100 py-2 pl-28 w-full border-b cursor-pointer"
              onClick={() => setDietTime("afternoon")}
            >
              Lunch
            </div>
            <div
              className=" bg-slate-100 py-2 pl-28 w-full border-b-2 border-l-2 cursor-pointer"
              onClick={() => setDietTime("night")}
            >
              Dinner
            </div>
          </div>
          <div className="h-full overflow-scroll">
            {dietTime === "morning" && (
              <DietOptions diet={dietItems.breakfast} dietTime={dietTime} />
            )}
            {dietTime === "afternoon" && (
              <DietOptions diet={dietItems.lunch} dietTime={dietTime} />
            )}
            {dietTime === "night" && (
              <DietOptions diet={dietItems.dinner} dietTime={dietTime} />
            )}
          </div>
        </div>
        <div className="w-2/6 bg-white ml-1 my-3 p-2 rounded-lg border-2">
          {dietTime === "morning" && (
            <DietBar
              calorieCount={calorieCount.breakfast}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              totalRequiredCaloriedCompleted={
                calorieCount.totalRequiredCaloriedCompleted
              }
              dietTime={"breakfast"}
            />
          )}
          {dietTime === "afternoon" && (
            <DietBar
              calorieCount={calorieCount.lunch}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              totalRequiredCaloriedCompleted={
                calorieCount.totalRequiredCaloriedCompleted
              }
              dietTime={"lunch"}
            />
          )}
          {dietTime === "night" && (
            <DietBar
              calorieCount={calorieCount.dinner}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              totalRequiredCaloriedCompleted={
                calorieCount.totalRequiredCaloriedCompleted
              }
              dietTime={"dinner"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
