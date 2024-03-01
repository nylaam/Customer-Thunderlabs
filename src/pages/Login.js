import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/background.jpg";
import companyLogo from "../assets/companylogo.png";
import userData from "../user.json";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberEntered, setPhoneNumberEntered] = useState(false);
  const [warningShown, setWarningShown] = useState(false); // menampilkan or menyembunyikan warning jika belum nginputkan nomor
  const [registeredUsers, setRegisteredUsers] = useState([]); // menyimpan user terdaftar
  const navigate = useNavigate();

  useEffect(() => {
    setRegisteredUsers(userData.customers);
  }, []);

  const handlePhoneNumberChange = (e) => {
    const inputNumber = e.target.value;
    const sanitizedInput = inputNumber.replace(/[^\d+]/g, ""); // biar inputan hanya bisa angka dan tanda "+"
    setPhoneNumber(sanitizedInput);

    if (sanitizedInput.length > 0) {
      setPhoneNumberEntered(true);
    } else {
      setPhoneNumberEntered(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumberEntered) {
      // untuk memeriksa nomornya sudah terdaftar / belum
      const userExists = registeredUsers.some(
        (user) => user.phone === phoneNumber
      );
      if (userExists) {
        localStorage.setItem("phoneNumber", phoneNumber);
        navigate("/submit");
      } else {
        setWarningShown(true);
      }
    } else {
      setWarningShown(true);
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
          className="h-8 md:h-12 mt-8 mb-2"
        />
        <form
          onSubmit={handleSubmit}
          className="md:max-w-[750px] max-w-[364px] w-full mx-auto bg-yellow-400 p-8 border border-gray-300 rounded-xl mt-10"
        >
          <div className="flex flex-col mb-6 relative">
            <label
              htmlFor="phone"
              className="text-gray-950 font-semibold text-base md:text-lg mb-3"
            >
              Masukkan nomor telepon anda
            </label>
            <input
              id="phone"
              placeholder="+62"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="bg-white text-gray-800 p-3 focus:outline-none focus:border-gray-700 rounded-2xl relative text-base md:text-lg"
              type="tel"
            />
          </div>
          {warningShown && !phoneNumberEntered && (
            <p className="text-red-500 text-sm mb-4">
              Harap masukkan nomor telepon terlebih dahulu
            </p>
          )}
          {warningShown && phoneNumberEntered && (
            <p className="text-red-500 text-sm mb-4">
              Nomor telepon tidak terdaftar
            </p>
          )}
          <button
            className={`w-full px-4 py-4 md:mt-6 bg-black hover:bg-yellow-500 rounded-2xl relative text-white font-bold`}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
