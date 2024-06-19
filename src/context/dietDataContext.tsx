"use client";
import { FoodItem } from "@/app/api/foodData";
import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from "react";

interface DietDataContextType {
  dietItems: DietItems;
  setDietItems: React.Dispatch<React.SetStateAction<DietItems>>;
}

interface DietItems {
  breakfast: Record<string, FoodItem[]>;
  lunch: Record<string, FoodItem[]>;
  dinner: Record<string, FoodItem[]>;
  bmi: number;
  bmr: number;
  interpretation: string;
  totalCaloricIntake: number;
  proteinCalorieIntake: number;
  carbsCalorieIntake: number;
  fatsCalorieIntake: number;
}

const DietDataContext = createContext<DietDataContextType>({
  dietItems: {
    breakfast: {},
    lunch: {},
    dinner: {},
    bmi: 0,
    bmr: 0,
    interpretation: "",
    totalCaloricIntake: 0,
    proteinCalorieIntake: 0,
    carbsCalorieIntake: 0,
    fatsCalorieIntake: 0,
  },
  setDietItems: () => {},
});

export const DietDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dietItems, setDietItems] = useState<DietItems>({
    breakfast: {},
    lunch: {},
    dinner: {},
    bmi: 0,
    bmr: 0,
    interpretation: "",
    totalCaloricIntake: 0,
    proteinCalorieIntake: 0,
    carbsCalorieIntake: 0,
    fatsCalorieIntake: 0,
  });

  return (
    <DietDataContext.Provider value={{ dietItems, setDietItems }}>
      {children}
    </DietDataContext.Provider>
  );
};

export default DietDataContext;

export const useDietContext = () => {
  return useContext(DietDataContext);
};
