import React, { useState } from "react";
import loginImg from "../assets/background.jpg";
import companyLogo from "../assets/companylogo.png";

export default function Submit() {
  return (
    <div className="relative w-full h-screen bg-yellow-400/85">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        style={{ opacity: "0.6" }}
        src={loginImg}
        alt="/"
      />
      <div className="flex flex-col justify-center items-center h-full">
        <img src={companyLogo} alt="Company Logo" className="h-12 mt-8 mb-4" />
        <form className="max-w-[750px] w-full mx-auto bg-yellow-400 p-10 border border-gray-300 rounded-xl mt-10">
          <label htmlFor="phone" className="text-gray-950 font-semibold text-lg mb-3 text-center w-full">Masukkan kode OTP</label>
          <div className="flex justify-center mb-6 relative">
            <input
              id="digit1"
              className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-md relative"
              type="text"
              style={{
                fontSize: "1.5rem",
                width: "4rem",
                marginRight: "1rem",
                textAlign: "center",
              }}
              maxlength="1"
            />
            <label
              htmlFor="digit2"
              className="text-gray-950 font-semibold text-lg mb-3 mx-2"
            ></label>
            <input
              id="digit2"
              className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-md relative"
              type="text"
              style={{
                fontSize: "1.5rem",
                width: "4rem",
                marginRight: "1rem",
                textAlign: "center",
              }}
              maxlength="1"
            />
            <label
              htmlFor="digit3"
              className="text-gray-950 font-semibold text-lg mb-3 mx-2"
            ></label>
            <input
              id="digit3"
              className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-md relative"
              type="text"
              style={{
                fontSize: "1.5rem",
                width: "4rem",
                marginRight: "1rem",
                textAlign: "center",
              }}
              maxlength="1"
            />
            <label
              htmlFor="digit4"
              className="text-gray-950 font-semibold text-lg mb-3 mx-2"
            ></label>
            <input
              id="digit4"
              className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-md relative"
              type="text"
              style={{ fontSize: "1.5rem", width: "4rem", textAlign: "center" }}
              maxlength="1"
            />
          </div>

          <button className="w-full py-4 mt-8 bg-black hover:bg-yellow-500 rounded-full relative text-white font-bold">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

const handleResendOtp = () => {
    console.log("Mengirim ulang kode OTP...");
  };