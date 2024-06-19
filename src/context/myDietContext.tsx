"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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

interface MyDiet {
  breakfastItems: Record<string, number>;
  lunchItems: Record<string, number>;
  dinnerItems: Record<string, number>;
}

interface DietContextType {
  myDiet: MyDiet;
  setMyDiet: React.Dispatch<React.SetStateAction<MyDiet>>;
}

const DietContext = createContext<DietContextType | null>(null);

export const useMyDietContext = () => {
  const context = useContext(DietContext);
  if (!context) {
    throw new Error("useDietContext must be used within a DietProvider");
  }
  return context;
};

export const DietProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [myDiet, setMyDiet] = useState<MyDiet>({
    breakfastItems: {},
    lunchItems: {},
    dinnerItems: {},
  });

  return (
    <DietContext.Provider value={{ myDiet, setMyDiet }}>
      {children}
    </DietContext.Provider>
  );
};
