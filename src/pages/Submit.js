import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/background.jpg";
import companyLogo from "../assets/companylogo.png";

export default function Submit() {
  const [countdown, setCountdown] = useState(120);
  const [otpInputs, setOtpInputs] = useState(Array(4).fill(""));
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const refs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const filledInputs = otpInputs.every(input => input !== "");
    setSubmitEnabled(filledInputs);
  }, [otpInputs]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...otpInputs];
    newInputs[index] = value;
    setOtpInputs(newInputs);

    const previousInputsFilled = newInputs.slice(0, index).every(input => input !== "");
    if (value !== "" && index < 3 && previousInputsFilled) {
      refs.current[index + 1].focus();
    }
  };

  const handleResendOtp = () => {
    console.log("Mengirim ulang kode OTP...");
  };

  const handleSubmit = () => {
    if (submitEnabled) {
      navigate('/dash');
    }
  };

  return (
    <div className="relative w-full h-screen bg-yellow-400/85">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        style={{ opacity: "0.6" }}
        src={loginImg}
        alt="/"
      />
      <div className="flex flex-col justify-center items-center h-full">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-12 mt-8 mb-4"
        />
        <form className="max-w-[750px] w-full mx-auto bg-yellow-400 p-8 border border-gray-300 rounded-xl mt-10">
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-950 font-semibold text-xl mb-6">
              Masukkan Kode OTP
            </p>
            <div className="flex justify-center relative">
              {otpInputs.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (refs.current[index] = el)}
                  className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-md relative"
                  type="text"
                  style={{
                    fontSize: "2.25rem",
                    width: "4rem",
                    marginRight: "1rem",
                    textAlign: "center",
                  }}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <button 
            className={`w-full py-4 mt-8 rounded-full relative font-bold ${submitEnabled ? 'bg-black hover:bg-yellow-500 text-white cursor-pointer' : 'bg-gray-200 text-white'}`} 
            onClick={handleSubmit} 
            disabled={!submitEnabled}>
            Submit
          </button>
          <p
            className="text-black font-semibold text-lg mt-4"
            style={{ textAlign: "center" }}
          >
            <span>Berlaku hingga </span>
            <span style={{ color: "red" }}>{formatTime(countdown)}</span>
          </p>
          <p
            className="text-white underline cursor-pointer text-center"
            onClick={handleResendOtp}
          >
            Kirim ulang kode OTP
          </p>
        </form>
      </div>
    </div>
  );
}
