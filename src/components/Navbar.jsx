import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed bg-primary w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex gap-2 items-center text-white">
              <img src="/asset/icon/Scan.svg" alt="logo" />
              <h1 className="text-2xl">STATELY</h1> - <span className="font-medium" >Bank Statement Converter</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
