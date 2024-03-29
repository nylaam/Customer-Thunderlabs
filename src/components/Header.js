import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import companyLogo from "../assets/companylogo.png";

export default function Header() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const handlePopstate = (event) => {
      if (window.location.pathname !== "/") {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("phoneNumber");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg py-5 px-6 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="h-7 md:h-10 mr-3 ml-3"
            />
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 mr-3 md:mr-7 text-lg font-semibold flex items-center"
            >
              <FiLogOut className="w-6 h-8" />
            </button>
          </div>
        </div>
      </header>
      {showConfirmation && (
        <div
          className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full md:max-w-[560px] max-w-[340px] relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div className="relative">
              <div className="text-center p-2 md:p-5 flex-auto justify-center">
                <h2 className="text-lg font-bold py-2">
                  Apakah tetap ingin keluar?
                </h2>
                <p className="text-sm text-gray-500 px-8">
                  Jika keluar akun maka akan dibutuhkan proses login akun
                  kembali
                </p>
              </div>
              <div className="p-2 text-center space-x-4 md:block">
                <button
                  onClick={cancelLogout}
                  className="mb-2 md:mb-4 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={confirmLogout}
                  className="mb-2 md:mb-4 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
