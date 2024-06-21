import { FoodItem, Meals, foodData } from "./foodData";

// Function to calculate BMI
export function calculateBMI(weight: number, height: number): number {
  // BMI formula: weight (kg) / (height (m) * height (m))
  return weight / (height * height);
}

// Function to interpret BMI
export function interpretBMI(bmi: number): string {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  if (gender === "male") {
    return 66.5 + 13.75 * weight + 5.033 * height - 6.75 * age;
  } else {
    return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }
}

const activityMultiplier: { [key: string]: number } = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9,
};

export function calculateAMR(bmr: number, activityLevel: string): number {
  const multiplier = activityMultiplier[activityLevel];
  if (multiplier) {
    return bmr * multiplier;
  } else {
    throw new Error("Invalid activity level");
  }
}

export function determineCaloricIntake(bmi: number, amr: number): number {
  if (bmi < 18.5) {
    return amr + 500; // Increase intake for underweight
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return amr; // Maintain intake for normal weight
  } else {
    return amr - 500; // Decrease intake for overweight/obese
  }
}
export function getMeals(
  foodData: FoodItem[],
  vegNonVeg: string,
  diseases: string[]
) {
  const meals: Meals = {
    Breakfast: {},
    Lunch: {},
    Dinner: {},
  };

  foodData.forEach((food) => {
    if (
      food.LactoseIntolerant === 0 &&
      diseases.includes("lactose intolerant")
    ) {
      // Skip lactose intolerant food when the user is lactose intolerant
      return;
    }

    if (food.Breakfast === 1) {
      if (vegNonVeg === "veg" && food.VegNonVeg === 1) {
        // Skip non-vegetarian food when vegNonVeg is "veg"
        return;
      }
      if (!meals.Breakfast[food.Category]) {
        meals.Breakfast[food.Category] = [];
      }
      meals.Breakfast[food.Category].push(food);
    }
    if (food.Lunch === 1) {
      if (vegNonVeg === "veg" && food.VegNonVeg === 1) {
        // Skip non-vegetarian food when vegNonVeg is "veg"
        return;
      }
      if (!meals.Lunch[food.Category]) {
        meals.Lunch[food.Category] = [];
      }
      meals.Lunch[food.Category].push(food);
    }
    if (food.Dinner === 1) {
      if (vegNonVeg === "veg" && food.VegNonVeg === 1) {
        // Skip non-vegetarian food when vegNonVeg is "veg"
        return;
      }
      if (!meals.Dinner[food.Category]) {
        meals.Dinner[food.Category] = [];
      }
      meals.Dinner[food.Category].push(food);
    }
  });

  return meals;
}
