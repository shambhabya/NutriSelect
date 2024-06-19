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
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
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

export function getMeals(foodData: FoodItem[]) {
  const meals: Meals = {
    Breakfast: {},
    Lunch: {},
    Snacks: {},
    Dinner: {},
  };

  foodData.forEach((food) => {
    if (food.Breakfast === 1) {
      if (!meals.Breakfast[food.Category]) {
        meals.Breakfast[food.Category] = [];
      }
      meals.Breakfast[food.Category].push(food);
    }
    if (food.Lunch === 1) {
      if (!meals.Lunch[food.Category]) {
        meals.Lunch[food.Category] = [];
      }
      meals.Lunch[food.Category].push(food);
    }
    if (food.Snacks === 1) {
      if (!meals.Snacks[food.Category]) {
        meals.Snacks[food.Category] = [];
      }
      meals.Snacks[food.Category].push(food);
    }
    if (food.Dinner === 1) {
      if (!meals.Dinner[food.Category]) {
        meals.Dinner[food.Category] = [];
      }
      meals.Dinner[food.Category].push(food);
    }
  });

  return meals;
}
