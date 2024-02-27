import React, { useState } from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const saldo = 1890000;
  const [keyword, setKeyword] = useState("");

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", keyword);
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-black text-white py-6 px-8 rounded-3xl w-11/12 h-52 flex flex-col justify-center items-center mb-10">
          <p className="font-bold text-3xl mb-4">Sisa Saldo</p>
          <p className="text-center font-bold text-6xl">
            {formatRupiah(saldo)}
          </p>
        </div>
        <div className="flex flex-row w-11/12 mb-4">
          <div className="w-1/2 mr-4 relative">
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-14 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ketik pencarianmu"
                name="keyword"
                value={keyword}
                onChange={handleChange}
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="submit"
                className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 bg-black hover:bg-yellow-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
