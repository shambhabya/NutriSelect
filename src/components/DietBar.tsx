import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useMyDietContext } from "@/context/myDietContext";

const DietBard: React.FC<any> = ({
  calorieCount,
  totalRequiredCalories,
  dietTime,
  completedTotalCalorie,
}) => {
  const { myDiet } = useMyDietContext();
  const [completedCalorie, setCompletedCalorie] = useState({
    completedFats: 0,
    completedProtein: 0,
    completedCarbs: 0,
  });

  useEffect(() => {
    console.log(dietTime, myDiet);
    if (dietTime === "breakfast") {
      let newCalorie = 0;
      let newFats = 0;
      let newProtein = 0;
      let newCarbs = 0;
      Object.keys(myDiet.breakfastItems).forEach((item) => {
        console.log(myDiet.breakfastItems[item]);
        newCalorie +=
          myDiet.breakfastItems[item].calories *
          myDiet.breakfastItems[item].count;
        newFats +=
          myDiet.breakfastItems[item].fat_total_g *
          myDiet.breakfastItems[item].count;
        newProtein +=
          myDiet.breakfastItems[item].protein_g *
          myDiet.breakfastItems[item].count;
        newCarbs +=
          myDiet.breakfastItems[item].carbohydrates_total_g *
          myDiet.breakfastItems[item].count;
      });

      setCompletedCalorie({
        completedCarbs: newCarbs,
        completedFats: newFats,
        completedProtein: newProtein,
      });
    }
    if (dietTime === "lunch") {
      let newCalorie = 0;
      let newFats = 0;
      let newProtein = 0;
      let newCarbs = 0;
      Object.keys(myDiet.lunchItems).forEach((item) => {
        console.log(myDiet.lunchItems[item]);
        newCalorie +=
          myDiet.lunchItems[item].calories * myDiet.lunchItems[item].count;
        newFats +=
          myDiet.lunchItems[item].fat_total_g * myDiet.lunchItems[item].count;
        newProtein +=
          myDiet.lunchItems[item].protein_g * myDiet.lunchItems[item].count;
        newCarbs +=
          myDiet.lunchItems[item].carbohydrates_total_g *
          myDiet.lunchItems[item].count;
      });
      setCompletedCalorie({
        completedCarbs: newCarbs,
        completedFats: newFats,
        completedProtein: newProtein,
      });
    }
    if (dietTime === "dinner") {
      let newCalorie = 0;
      let newFats = 0;
      let newProtein = 0;
      let newCarbs = 0;
      Object.keys(myDiet.dinnerItems).forEach((item) => {
        console.log(myDiet.dinnerItems[item]);
        newCalorie +=
          myDiet.dinnerItems[item].calories * myDiet.dinnerItems[item].count;
        newFats +=
          myDiet.dinnerItems[item].fat_total_g * myDiet.dinnerItems[item].count;
        newProtein +=
          myDiet.dinnerItems[item].protein_g * myDiet.dinnerItems[item].count;
        newCarbs +=
          myDiet.dinnerItems[item].carbohydrates_total_g *
          myDiet.dinnerItems[item].count;
      });
      setCompletedCalorie({
        completedCarbs: newCarbs,
        completedFats: newFats,
        completedProtein: newProtein,
      });
    }
    console.log("done completed calorie", completedCalorie);
  }, [myDiet]);
  return (
    <div className="">
      <div className="flex flex-col gap-10 px-10">
        <ProgressBar
          calorie={completedTotalCalorie}
          totalCalorie={totalRequiredCalories}
          item="Total Daily Calories"
        />
        <div className="flex justify-center">
          <div className=" underline text-slate-500">
            {dietTime.charAt(0).toUpperCase() + dietTime.slice(1)} Calories
          </div>
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
        {/* <div className="flex justify-center ">
          <Button>Diet Chart</Button>
        </div> */}
      </div>
    </div>
  );
};

export default DietBard;
