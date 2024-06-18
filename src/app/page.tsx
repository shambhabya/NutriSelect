import Calculator from "@/components/Calculator";
import DietPlanner from "@/components/DietPlanner";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import { DietDataProvider } from "@/context/dietDataContext";

export default function Home() {
  return (
    <DietDataProvider>
      <main className=" h-screen bg-green-200">
        <Navbar />
        <DietPlanner />
      </main>
    </DietDataProvider>
  );
}
