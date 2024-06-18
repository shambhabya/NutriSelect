import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";

const DietPlanner = () => {
  return (
    <div className=" h-full">
      <div className="py-2 px-10 text-2xl font-bold text-red-400">
        Diet Planner
      </div>
      <div className="pb-2 px-10">
        Your calculated BMI is 62, which shows you are overweight. Based on your
        BMI and calculated BMR, your daily calorie need is 1000cal, which you
        keep you help you maintain a healthy and fit body.
      </div>
      <div className="flex w-full px-10 h-4/5">
        <div className=" w-5/6 bg-white mr-1 my-3  rounded-lg border-2">
          <div className="flex justify-between ">
            <div className=" bg-slate-200 py-2 pl-28 w-full border-b-2 border-r ">
              Breakfast
            </div>
            <div className=" bg-slate-100 py-2 pl-28 w-full border-b ">
              Lunch
            </div>
            <div className=" bg-slate-100 py-2 pl-28 w-full border-b-2 border-l-2">
              Dinner
            </div>
          </div>
        </div>
        <div className="w-2/6 bg-white ml-1 my-3 p-2 rounded-lg border-2">
          <div className="">
            <div className="flex flex-col gap-10 px-10">
              <ProgressBar
                calorie={20}
                totalCalorie={100}
                item="Total daily Calories"
              />
              <div className="flex justify-center">
                <div className=" underline text-slate-500">
                  {`Morning`} Calories
                </div>
              </div>
              <ProgressBar calorie={20} totalCalorie={100} item="Fats" />
              <ProgressBar calorie={20} totalCalorie={100} item="Protein" />
              <ProgressBar calorie={20} totalCalorie={100} item="Carbs" />
              <div className="flex justify-center ">
                <Button>Diet Chart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
