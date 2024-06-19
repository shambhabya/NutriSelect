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

  useEffect(() => {
    console.log(myDiet);
  }, [myDiet]);

  const updateMyDiet = (itemName: string, operation: string) => {
    setMyDiet((prevMyDiet) => {
      switch (dietTime) {
        case "morning":
          if (operation === "increment") {
            prevMyDiet.breakfastItems[itemName] =
              (prevMyDiet.breakfastItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (prevMyDiet.breakfastItems[itemName] || 0) > 0
          ) {
            prevMyDiet.breakfastItems[itemName] =
              (prevMyDiet.breakfastItems[itemName] || 0) - 1;
          }
          break;
        case "afternoon":
          if (operation === "increment") {
            prevMyDiet.lunchItems[itemName] =
              (prevMyDiet.lunchItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (prevMyDiet.lunchItems[itemName] || 0) > 0
          ) {
            prevMyDiet.lunchItems[itemName] =
              (prevMyDiet.lunchItems[itemName] || 0) - 1;
          }
          break;
        case "night":
          if (operation === "increment") {
            prevMyDiet.dinnerItems[itemName] =
              (prevMyDiet.dinnerItems[itemName] || 0) + 1;
          } else if (
            operation === "decrement" &&
            (prevMyDiet.dinnerItems[itemName] || 0) > 0
          ) {
            prevMyDiet.dinnerItems[itemName] =
              (prevMyDiet.dinnerItems[itemName] || 0) - 1;
          }
          break;
        default:
          break;
      }

      return prevMyDiet;
    });
    console.log(myDiet);
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
