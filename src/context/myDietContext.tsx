"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyDiet {
  breakfastItems: Record<string, DietItem>;
  lunchItems: Record<string, DietItem>;
  dinnerItems: Record<string, DietItem>;
}

interface DietItem {
  count: number;
  calories: number;
  fat_total_g: number;
  carbohydrates_total_g: number;
  protein_g: number;
}

interface DietContextType {
  myDiet: MyDiet;
  setMyDiet: React.Dispatch<React.SetStateAction<MyDiet>>;
}

const DietContext = createContext<DietContextType>({
  myDiet: { breakfastItems: {}, lunchItems: {}, dinnerItems: {} },
  setMyDiet: () => {},
});

export const useMyDietContext = () => {
  return useContext(DietContext);
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
