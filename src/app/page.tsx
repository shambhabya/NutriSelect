"use client";
import Calculator from "@/components/Calculator";
import DietPlanner from "@/components/DietPlanner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useDietContext } from "@/context/dietDataContext";
import { useMyDietContext } from "@/context/myDietContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { dietItems, setDietItems } = useDietContext();
  const { myDiet, setMyDiet } = useMyDietContext();

  useEffect(() => {
    console.log("1-");
  }, [myDiet]);

  return (
    <main className="h-screen bg-green-200 overflow-scroll">
      <Navbar />
      <Calculator />
      <DietPlanner />
      <Button
        onClick={() => {
          console.log("ok");
          setMyDiet({
            breakfastItems: {},
            lunchItems: {},
            dinnerItems: {},
          });
        }}
      >
        yoo
      </Button>
    </main>
  );
}
