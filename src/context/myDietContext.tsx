"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyDiet {
  breakfastItems: Record<string, number>;
  lunchItems: Record<string, number>;
  dinnerItems: Record<string, number>;
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
