import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <div className=" h-8 w-full flex justify-between items-center p-6 bg-white text-slate-700">
        <div className=" font-bold text-2xl">My Indian Diet</div>
        <div className=" flex gap-5">
          <div>About Us</div>
          <div>Q&A</div>
          <div>Create Diet</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
