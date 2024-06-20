import { NextRequest, NextResponse } from "next/server";
import {
  calculateAMR,
  calculateBMI,
  calculateBMR,
  determineCaloricIntake,
  getMeals,
  interpretBMI,
} from "./functions";
import { z } from "zod";
import { formSchema } from "@/components/Calculator";
import { foodData } from "./foodData";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      message: "hello",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = (await request.json()) as z.infer<typeof formSchema>;

    const { weight, height, age, gender, vegNonVeg, activityLevel, diseases } =
      reqBody;

    if (
      typeof weight !== "number" ||
      typeof height !== "number" ||
      typeof age !== "number" ||
      typeof gender !== "string" ||
      typeof activityLevel !== "string" ||
      weight <= 0 ||
      height <= 0 ||
      age <= 0 ||
      (gender !== "male" && gender !== "female")
    ) {
      return NextResponse.json({
        error:
          'Invalid input. Weight, height, and age must be positive numbers, gender must be "male" or "female", and activity level must be a valid string.',
      });
    }

    const heightInMeters = height / 100;
    const fat = 9;
    const protein = 4;
    const carbs = 4;

    const bmi = Math.round(calculateBMI(weight, heightInMeters));
    const bmr = calculateBMR(weight, height, age, gender);
    const interpretation = interpretBMI(bmi);
    const amr = calculateAMR(bmr, activityLevel);
    const totalCaloricIntake = Math.round(determineCaloricIntake(bmi, amr));
    const proteinCalorieIntake = weight * protein;
    const fatsCalorieIntake = 0.3 * totalCaloricIntake;
    const carbsCalorieIntake =
      totalCaloricIntake - fatsCalorieIntake - proteinCalorieIntake;

    // const breakfastItems = [];
    const lunchItems = [];
    const dinnerItems = [];
    const meals = getMeals(foodData, vegNonVeg);

    return NextResponse.json({
      bmi,
      bmr,
      interpretation,
      totalCaloricIntake,
      proteinCalorieIntake,
      carbsCalorieIntake,
      fatsCalorieIntake,
      breakfast: meals.Breakfast,
      lunch: meals.Lunch,
      dinner: meals.Dinner,
    });
  } catch (error) {
    NextResponse.json(error);
  }
}
