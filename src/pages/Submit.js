import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/background.jpg";
import companyLogo from "../assets/companylogo.png";
import userData from "../user.json";

export default function Submit() {
  const [otpInputs, setOtpInputs] = useState(Array(4).fill(""));
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const refs = useRef([]);
  const navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);
  
  useEffect(() => {
    const filledInputs = otpInputs.every(input => input !== "");
    setSubmitEnabled(filledInputs);
  }, [otpInputs]);

  useEffect(() => {
    setRegisteredUsers(userData.customers);
  }, []);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value !== "" && value >= 0 && value <= 9) {
      const newInputs = [...otpInputs];
      newInputs[index] = value;
      setOtpInputs(newInputs);
  
      const previousInputsFilled = newInputs.slice(0, index).every(input => input !== "");
      if (value !== "" && index < 3 && previousInputsFilled) {
        refs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newInputs = [...otpInputs];
      newInputs[index] = "";
      setOtpInputs(newInputs);
  
      if (index > 0) {
        refs.current[index - 1].focus();
      }
    }
  };  

  const handleSubmit = () => {
    if (submitEnabled) {
        const enteredOTP = otpInputs.join("");
        const phoneNumber = localStorage.getItem("phoneNumber");
        const user = registeredUsers.find(user => user.phone === phoneNumber); // find user berdasarkan nomor telepon yang diinput & disimpan
        if (user && enteredOTP === user.otp) { // mengetahui apakah user ditemukan dan OTP nya sesuai
            navigate('/dash');
        } else {
            console.log("Kode OTP tidak valid");
        }
    }
};

  return (
    <div className="relative w-full h-screen bg-yellow-400/85">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay opacity-60"
        src={loginImg}
        alt="/"
      />
      <div className="flex flex-col justify-center items-center h-full">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-8 md:h-12 mt-8 mb-4"
        />
        <form className="md:max-w-[750px] max-w-[364px] w-full mx-auto bg-yellow-400 p-8 border border-gray-300 rounded-xl mt-10">
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-950 font-semibold text-xl mb-6">
              Masukkan Kode OTP
            </p>
            <div className="flex justify-center relative">
              {otpInputs.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (refs.current[index] = el)}
                  className="bg-gray-100 text-gray-800 p-4 focus:outline-none focus:border-gray-700 rounded-2xl relative text-2xl md:text-4xl w-16 mr-4 text-center"
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <button 
            className={`w-full py-4 mt-8 rounded-2xl relative font-bold  ${submitEnabled ? 'bg-black hover:bg-yellow-500 text-white cursor-pointer' : 'bg-gray-200 text-gray-400'}`} 
            onClick={handleSubmit} 
            disabled={!submitEnabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
