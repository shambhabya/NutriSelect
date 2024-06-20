import { useDietContext } from "@/context/dietDataContext";
import { useMyDietContext } from "@/context/myDietContext";
import React, { useEffect } from "react";
import { number } from "zod";

export interface FoodItem {
  name: string;
  Breakfast: number;
  Lunch: number;
  Dinner: number;
  Diabetes: number;
  LactoseIntolerant: number;
  Thyroid: number;
  VegNonVeg: number;
  Category: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  cholesterol_mg: number;
  sodium_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
  protein_g: number;
}

const DietOptions: React.FC<{
  diet: Record<string, FoodItem[]>;
  dietTime: string;
}> = ({ diet, dietTime }) => {
  const { myDiet, setMyDiet } = useMyDietContext();
  const { dietItems } = useDietContext();

  // useEffect(() => {
  //   console.log("2");
  // }, [dietItems]);

  const updateMyDiet = (item: FoodItem, operation: string) => {
    setMyDiet((prevMyDiet) => {
      const newDiet = { ...prevMyDiet };

      switch (dietTime) {
        case "morning":
          newDiet.breakfastItems = { ...newDiet.breakfastItems };
          if (!newDiet.breakfastItems[item.name]) {
            // Create a new item if it's not present
            newDiet.breakfastItems[item.name] = {
              count: 0,
              calories: item.calories,
              fat_total_g: item.fat_total_g,
              carbohydrates_total_g: item.carbohydrates_total_g,
              protein_g: item.protein_g,
            };
            if (operation === "increment") {
              newDiet.breakfastItems[item.name].count = 1;
            }
          } else if (operation === "increment") {
            // Increment count if the item exists
            newDiet.breakfastItems[item.name] = {
              ...newDiet.breakfastItems[item.name],
              count: newDiet.breakfastItems[item.name].count + 1,
            };
          } else if (
            operation === "decrement" &&
            newDiet.breakfastItems[item.name].count > 0
          ) {
            newDiet.breakfastItems[item.name] = {
              ...newDiet.breakfastItems[item.name],
              count: newDiet.breakfastItems[item.name].count - 1,
            };
          }
          break;
        case "afternoon":
          newDiet.lunchItems = { ...newDiet.lunchItems };
          if (!newDiet.lunchItems[item.name]) {
            // Create a new item if it's not present
            newDiet.lunchItems[item.name] = {
              count: 1,
              calories: item.calories,
              fat_total_g: item.fat_total_g,
              carbohydrates_total_g: item.carbohydrates_total_g,
              protein_g: item.protein_g,
            };
            if (operation === "increment") {
              newDiet.lunchItems[item.name].count = 1;
            }
          } else if (operation === "increment") {
            // Increment count if the item exists
            newDiet.lunchItems[item.name] = {
              ...newDiet.lunchItems[item.name],
              count: newDiet.lunchItems[item.name].count + 1,
            };
          } else if (
            operation === "decrement" &&
            newDiet.lunchItems[item.name].count > 0
          ) {
            // Decrement count if the item exists and count > 0
            newDiet.lunchItems[item.name] = {
              ...newDiet.lunchItems[item.name],
              count: newDiet.lunchItems[item.name].count - 1,
            };
          }
          break;
        case "night":
          newDiet.dinnerItems = { ...newDiet.dinnerItems };
          if (!newDiet.dinnerItems[item.name]) {
            // Create a new item if it's not present
            newDiet.dinnerItems[item.name] = {
              count: 1,
              calories: item.calories,
              fat_total_g: item.fat_total_g,
              carbohydrates_total_g: item.carbohydrates_total_g,
              protein_g: item.protein_g,
            };

            if (operation === "increment") {
              newDiet.dinnerItems[item.name].count = 1;
            }
          } else if (operation === "increment") {
            // Increment count if the item exists
            newDiet.dinnerItems[item.name] = {
              ...newDiet.dinnerItems[item.name],
              count: newDiet.dinnerItems[item.name].count + 1,
            };
          } else if (
            operation === "decrement" &&
            newDiet.dinnerItems[item.name].count > 0
          ) {
            // Decrement count if the item exists and count > 0
            newDiet.dinnerItems[item.name] = {
              ...newDiet.dinnerItems[item.name],
              count: newDiet.dinnerItems[item.name].count - 1,
            };
          }
          break;
        default:
          break;
      }

      return newDiet;
    });
  };

  return (
    <div className="p-3">
      {Object.entries(diet).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <div className="mt-2">
            <span className="text-2xl font-bold rounded-md bg-red-300 p-1 ">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
          <ul className="flex gap-3 flex-wrap">
            {value.map((item, index) => (
              <li
                key={index}
                className="text-sm font-light border-2 border-purple-300 rounded-md p-2"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="text-lg font-medium mb-2">
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </div>
                  <div>Serving Size: {item.serving_size_g} g</div>
                  <div>Total Calories: {item.calories}</div>
                  <div>Protein: {item.protein_g} gm</div>
                  <div>Fats: {item.fat_total_g} gm</div>
                  <div className="mb-2">
                    Carbs: {item.carbohydrates_total_g} gm
                  </div>
                </div>
                <div className="flex justify-center gap-4 bg-slate-300 px-2 font-semibold text-xl">
                  <div
                    className="cursor-pointer"
                    onClick={() => updateMyDiet(item, "increment")}
                  >
                    +
                  </div>
                  <div className="">
                    {dietTime === "morning" && (
                      <div>{myDiet.breakfastItems[item.name]?.count ?? 0}</div>
                    )}
                    {dietTime === "afternoon" && (
                      <div>{myDiet.lunchItems[item.name]?.count ?? 0}</div>
                    )}
                    {dietTime === "night" && (
                      <div>{myDiet.dinnerItems[item.name]?.count ?? 0}</div>
                    )}
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => updateMyDiet(item, "decrement")}
                  >
                    -
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DietOptions;
