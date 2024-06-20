"use client";
import Calculator from "@/components/Calculator";
import DietPlanner from "@/components/DietPlanner";
import Homepage from "@/components/Homepage";
import MyDietPreview from "@/components/MyDietPreview";
import Tools from "@/components/Tools";
import { useDietContext } from "@/context/dietDataContext";
import { useState } from "react";

export default function Home() {
  const { dietItems } = useDietContext();
  const [myDisease, setMyDisease] = useState(["no disease"]);

  return (
    <main className=" bg-gradient-to-b from-custom-light-blue to-orange-100 overflow-scroll">
      <Homepage />
      <Tools />
      <div className="h-screen  flex justify-center items-center">
        <Calculator myDisease={myDisease} setMyDisease={setMyDisease} />
      </div>

      <div id="dietPlanner">
        {Object.keys(dietItems.breakfast).length != 0 && <DietPlanner />}
        {Object.keys(dietItems.breakfast).length != 0 && <MyDietPreview />}
      </div>
    </main>
  );
}
