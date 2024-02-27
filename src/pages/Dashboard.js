import React from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const saldo = 1890000;

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-black text-white py-6 px-8 rounded-3xl w-11/12 h-52 flex flex-col justify-center items-center">
          <p className="font-bold text-3xl mb-4">Sisa Saldo</p>
          <p className="text-center font-bold text-6xl">{formatRupiah(saldo)}</p>
        </div>
      </div>

    </div>
  );
}
