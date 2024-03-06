import React from "react";
import userData from "../user.json"; 

const DetailTransaction = ({ transaction, onClose }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const customer = userData.customers.find(
    (customer) => customer.id === transaction.user_id
  );

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-md mx-4">
        <div className="flex justify-between items-center px-4 py-2 sm:px-8 sm:py-4">
          <h3 className="text-black text-lg sm:text-xl font-bold">Invoice</h3>
          <button
            className="text-gray-700 hover:text-gray-900 text-xl sm:text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <hr className="mt-0 border-t border-black w-full" />
        <div className="p-4 sm:p-8">
          <p className="text-lg font-semibold text-black">
            {transaction.transaction_type}
          </p>
          <div className="flex flex-col sm:flex-row mt-2">
            <div className="mb-4 sm:mr-6 sm:mb-0">
              <p className="text-sm text-gray-700">{customer.name}</p>
              <p className="text-sm text-gray-700">{customer.address}</p>
              <p className="text-sm text-gray-700">{customer.phone}</p>
            </div>
            <div className="md:ml-auto">
              <p className="text-sm text-gray-700">
                Nomor Invoice <span className="font-semibold">{transaction.invoice}</span>{" "}
              </p>
              <p className="text-sm text-gray-700">
                Tanggal Transaksi <span className="font-semibold">{transaction.transaction_date}</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="p-3 md:p-6">
  <div className="mb-2">
    <div className="bg-yellow-300 py-2 px-4 grid grid-cols-4 gap-2 font-semibold md:font-bold text-sm text-black">
      <p className="mb-0">No.</p>
      <p className="mb-0">Deskripsi</p>
      <p className="ml-28">Total</p>
    </div>
    <div className="hidden md:block">
      {/* desktop */}
      <div 
        key={transaction.id}
        className="flex flex-col md:flex-row items-center justify-between mt-2 ml-6"
      >
        <p className="mb-2 text-sm text-black">1</p>
        <p className="mb-2 text-sm text-black line-clamp-2">{transaction.description}</p>
        <p className="mb-2 text-sm text-black mr-1">
          {formatRupiah(transaction.total_amount)}
        </p>
      </div>
    </div>
    <div className="md:hidden">
      {/* mobile */}
      <div className="flex mt-3">
        <div className="flex justify-between w-full mr-3">
          <p className="text-sm text-black ml-6">1</p>
          <p className="text-sm text-black line-clamp-2 ml-7">{transaction.description}</p>
        </div>
        <p className="text-sm text-black">{formatRupiah(transaction.total_amount)}</p>
      </div>
    </div>
  </div>
  <hr className="border-t border-gray-300" />
  <div className="flex justify-end mt-4">
    <p className="text-sm md:text-base font-semibold text-black">
      Total : {formatRupiah(transaction.total_amount)}
    </p>
  </div>
</div>

        </div>
      </div>
  );
};

export default DetailTransaction;
