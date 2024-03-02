import React from "react";
import userData from "../user.json"; // Import data pelanggan

const DetailTransaction = ({ transaction, onClose }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // Temukan pelanggan yang sesuai berdasarkan user_id dari transaksi
  const customer = userData.customers.find(
    (customer) => customer.id === transaction.user_id
  );

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl w-full sm:max-w-3xl">
        <div className="flex justify-between items-center px-8 py-4">
          <h3 className="text-black text-xl font-bold">Invoice</h3>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>
        <hr className="mt-0 border-t border-black w-full" />
        <div className="p-8">
          <p className="text-lg font-semibold text-black">
            {transaction.transaction_type}
          </p>
          <div className="flex justify-between mt-2">
            <div>
              {/* Tampilkan informasi pelanggan */}
              <p className="text-sm text-gray-700">{customer.name}</p>
              <p className="text-sm text-gray-700">{customer.address}</p>
              <p className="text-sm text-gray-700">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Invoice Number: {transaction.invoice}
              </p>
              <p className="text-sm text-gray-700">
                Transaction Date: {transaction.transaction_date}
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <div className="bg-yellow-300 py-2 px-4 grid grid-cols-4 gap-2 font-semibold text-black">
              <p className="mb-0">No.</p>
              <p className="mb-0">Deskripsi</p>
              <p className="mb-0">Harga</p>
              <p className="mb-0">Total</p>
            </div>
            {/* Tampilkan data transaksi di sini */}
            <div
              key={transaction.id}
              className="flex justify-between mt-2 ml-3"
            >
              <p className="flex-1">1</p>
              <p className="flex-1">{transaction.description}</p>
              <p className="flex-1">{formatRupiah(transaction.total_amount)}</p>
              <p className="flex-1">{formatRupiah(transaction.total_amount)}</p>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-end mt-4">
            <p className="text-lg font-semibold text-black">
              Total: {formatRupiah(transaction.total_amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;
