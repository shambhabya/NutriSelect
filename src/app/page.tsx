"use client";
import Calculator from "@/components/Calculator";
import DietPlanner from "@/components/DietPlanner";
import Navbar from "@/components/Navbar";
import { useDietContext } from "@/context/dietDataContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { dietItems } = useDietContext();

  return (
    <main className="h-screen bg-green-200 overflow-scroll">
      <Navbar />
      <Calculator />
      <DietPlanner />
    </main>
  );
}
