import React, { useEffect, useState } from "react";
import DietBar from "./DietBar";
import DietOptions from "./DietOptions";
import { useDietContext } from "@/context/dietDataContext";
import { useMyDietContext } from "@/context/myDietContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DietPlanner = ({ myDisease }: any) => {
  const { dietItems } = useDietContext();
  const { myDiet } = useMyDietContext();
  const router = useRouter();

  const [dietTime, setDietTime] = useState("morning");
  const [totalRequiredCaloriesCompleted, setTotalRequiredCaloriesCompleted] =
    useState(0);
  const [calorieCount, setTotalCalorieCount] = useState({
    totalRequiredCalories: 0,
    breakfast: {
      requiredFats: 0,
      requiredProtein: 0,
      requiredCarbs: 0,
    },
    lunch: {
      requiredFats: 0,
      requiredProtein: 0,
      requiredCarbs: 0,
    },
    dinner: {
      requiredFats: 0,
      requiredProtein: 0,
      requiredCarbs: 0,
    },
  });

  useEffect(() => {
    const {
      totalCaloricIntake,
      proteinCalorieIntake,
      carbsCalorieIntake,
      fatsCalorieIntake,
    } = dietItems;
    setTotalCalorieCount({
      totalRequiredCalories: totalCaloricIntake,
      breakfast: {
        requiredFats: Math.round(0.3 * fatsCalorieIntake),
        requiredProtein: Math.round(0.3 * proteinCalorieIntake),
        requiredCarbs: Math.round(0.3 * carbsCalorieIntake),
      },
      lunch: {
        requiredFats: Math.round(0.35 * fatsCalorieIntake),
        requiredProtein: Math.round(0.35 * proteinCalorieIntake),
        requiredCarbs: Math.round(0.35 * carbsCalorieIntake),
      },
      dinner: {
        requiredFats: Math.round(0.35 * fatsCalorieIntake),
        requiredProtein: Math.round(0.35 * proteinCalorieIntake),
        requiredCarbs: Math.round(0.35 * carbsCalorieIntake),
      },
    });
  }, [dietItems]);

  useEffect(() => {
    const calculateTotalCalories = (myDiet: any): number => {
      let totalCalories = 0;

      const addCalories = (items: any) => {
        Object.values(items).forEach((item: any) => {
          totalCalories += item.calories * item.count;
        });
      };

      addCalories(myDiet.breakfastItems);
      addCalories(myDiet.lunchItems);
      addCalories(myDiet.dinnerItems);

      return Math.round(totalCalories);
    };

    setTotalRequiredCaloriesCompleted(calculateTotalCalories(myDiet));
  }, [myDiet]);

  return (
    <div className=" h-screen ">
      <div className="py-2 px-10 text-3xl font-bold text-red-400">
        Diet Planner
      </div>
      <div className="pb-2 px-10 ">
        Your BMI is {dietItems.bmi}, indicating you are{" "}
        {dietItems.interpretation}. Considering your BMI and calculated BMR,
        your daily calorie requirement is {dietItems.totalCaloricIntake}{" "}
        calories. This intake will support maintaining a healthy and fit body.
      </div>
      <div className="px-10">
        Food Items marked with <span className="text-red-500">Red Border</span>{" "}
        are asked to be consume in moderation based on disease or allergy.
      </div>
      <div className="flex w-full px-10 h-4/5">
        <div className="flex flex-col w-5/6 bg-white mr-1 my-3  rounded-lg border-2">
          <div className="flex justify-between ">
            <div
              className={`py-2 pl-28 w-full border-b-2 border-r cursor-pointer ${
                dietTime === "morning" ? "bg-slate-400" : "bg-slate-100"
              }`}
              onClick={() => setDietTime("morning")}
            >
              Breakfast
            </div>
            <div
              className={`py-2 pl-28 w-full border-b cursor-pointer ${
                dietTime === "afternoon" ? "bg-slate-400" : "bg-slate-100"
              }`}
              onClick={() => setDietTime("afternoon")}
            >
              Lunch
            </div>
            <div
              className={`py-2 pl-28 w-full border-b-2 border-r cursor-pointer ${
                dietTime === "night" ? "bg-slate-400" : "bg-slate-100"
              }`}
              onClick={() => setDietTime("night")}
            >
              Dinner
            </div>
          </div>
          <div className="h-full overflow-scroll">
            {dietTime === "morning" && (
              <DietOptions
                diet={dietItems.breakfast}
                dietTime={dietTime}
                myDisease={myDisease}
              />
            )}
            {dietTime === "afternoon" && (
              <DietOptions
                diet={dietItems.lunch}
                dietTime={dietTime}
                myDisease={myDisease}
              />
            )}
            {dietTime === "night" && (
              <DietOptions
                diet={dietItems.dinner}
                dietTime={dietTime}
                myDisease={myDisease}
              />
            )}
          </div>
        </div>
        <div className="w-2/6 bg-white ml-1 my-3 p-2 rounded-lg border-2">
          {dietTime === "morning" && (
            <DietBar
              calorieCount={calorieCount.breakfast}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              dietTime={"breakfast"}
              setTotalCalorieCount={setTotalCalorieCount}
              completedTotalCalorie={totalRequiredCaloriesCompleted}
            />
          )}
          {dietTime === "afternoon" && (
            <DietBar
              calorieCount={calorieCount.lunch}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              dietTime={"lunch"}
              setTotalCalorieCount={setTotalCalorieCount}
              completedTotalCalorie={totalRequiredCaloriesCompleted}
            />
          )}
          {dietTime === "night" && (
            <DietBar
              calorieCount={calorieCount.dinner}
              totalRequiredCalories={calorieCount.totalRequiredCalories}
              dietTime={"dinner"}
              setTotalCalorieCount={setTotalCalorieCount}
              completedTotalCalorie={totalRequiredCaloriesCompleted}
            />
          )}
          <div className="flex justify-center items-center mt-6">
            <Button
              onClick={() => {
                router.push("#preview");
              }}
            >
              Create Diet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
