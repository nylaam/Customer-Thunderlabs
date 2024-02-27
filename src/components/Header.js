import React from "react";
import companyLogo from "../assets/companylogo.png";

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-10 w-auto mr-3 ml-14"
          />
        </div>
      </div>
    </header>
  );
}
