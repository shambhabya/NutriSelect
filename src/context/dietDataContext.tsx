"use client";
import React, { createContext, useState, ReactNode, FC } from "react";

interface DietDataContextType {
  dietItems: any;
  setDietItems: React.Dispatch<React.SetStateAction<any>>;
}

const DietDataContext = createContext<DietDataContextType | undefined>(
  undefined
);

export const DietDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dietItems, setDietItems] = useState<any>(null);

  return (
    <DietDataContext.Provider value={{ dietItems, setDietItems }}>
      {children}
    </DietDataContext.Provider>
  );
};

export default DietDataContext;
