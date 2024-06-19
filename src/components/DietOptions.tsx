import { useDietContext } from "@/context/dietDataContext";
import { useMyDietContext } from "@/context/myDietContext";
import React, { useEffect } from "react";

export interface FoodItem {
  name: string;
  Breakfast: number;
  Lunch: number;
  Snacks: number;
  Dinner: number;
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

  useEffect(() => {
    console.log("2");
  }, [myDiet]);

  // useEffect(() => {
  //   console.log("2");
  // }, [dietItems]);

  const updateMyDiet = (itemName: string, operation: string) => {
    setMyDiet((prevMyDiet) => {
      // Creating a copy of the previous state to avoid direct mutation
      const newDiet = { ...prevMyDiet };

      switch (dietTime) {
        case "morning":
          newDiet.breakfastItems = { ...newDiet.breakfastItems };
          if (operation === "increment") {
            newDiet.breakfastItems[itemName] =
              (newDiet.breakfastItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (newDiet.breakfastItems[itemName] || 0) > 0
          ) {
            newDiet.breakfastItems[itemName] =
              (newDiet.breakfastItems[itemName] || 0) - 1;
          }
          break;
        case "afternoon":
          newDiet.lunchItems = { ...newDiet.lunchItems };
          if (operation === "increment") {
            newDiet.lunchItems[itemName] =
              (newDiet.lunchItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (newDiet.lunchItems[itemName] || 0) > 0
          ) {
            newDiet.lunchItems[itemName] =
              (newDiet.lunchItems[itemName] || 0) - 1;
          }
          break;
        case "night":
          newDiet.dinnerItems = { ...newDiet.dinnerItems };
          if (operation === "increment") {
            newDiet.dinnerItems[itemName] =
              (newDiet.dinnerItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (newDiet.dinnerItems[itemName] || 0) > 0
          ) {
            newDiet.dinnerItems[itemName] =
              (newDiet.dinnerItems[itemName] || 0) - 1;
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
                className="text-sm font-light border rounded-md p-1"
              >
                <div>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </div>
                <div className="flex justify-center gap-1 bg-slate-300">
                  <div
                    className="cursor-pointer"
                    onClick={() => updateMyDiet(item.name, "increment")}
                  >
                    +
                  </div>
                  <div className="">{}</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => updateMyDiet(item.name, "decrement")}
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
