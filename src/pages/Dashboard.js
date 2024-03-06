import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import userData from "../user.json";
import transactionData from "../datatransaksi.json";
import DetailTransaction from "./DetailTransaction";

export default function Dashboard() {
  const [saldo, setSaldo] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(7);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // menampilkan pop up untuk transaksi yang dipilih

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");

    // find user berdasarkan nomor telepon terdaftar
    const user = userData.customers.find((user) => user.phone === phoneNumber);
    if (user) {
      setSaldo(user.balance);
    }

    // mengambil data transaksi berdasarkan user_id di data user
    const userTransactions = transactionData.transactions
      .filter((transaction) => transaction.user_id === user.id)
      .sort(
        (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
      ); // sorting transaksi berdasarkan tanggal transaksi terbaru
    setTransactions(userTransactions);
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
    if (value === "") {
      // menampilkan data semula jika tidak ada yg di search
      const phoneNumber = localStorage.getItem("phoneNumber");
      const user = userData.customers.find(
        (user) => user.phone === phoneNumber
      );
      if (user) {
        const userTransactions = transactionData.transactions
          .filter((transaction) => transaction.user_id === user.id)
          .sort(
            (a, b) =>
              new Date(b.transaction_date) - new Date(a.transaction_date)
          );
        setTransactions(userTransactions);
      }
    } else {
      handleSearch(value);
    }
  };

  const handleSearch = () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    const user = userData.customers.find((user) => user.phone === phoneNumber);

    if (user) {
      const filteredTransactions = transactionData.transactions
        .filter((transaction) => transaction.user_id === user.id)
        .filter((transaction) =>
          transaction.transaction_type
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      setTransactions(filteredTransactions);
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions
    .filter((transaction) =>
      transaction.transaction_type.toLowerCase().includes(keyword)
    )
    .slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetailTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetailTransaction = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="flex h-full bg-gray-100 pt-10">
      <Header />
      <div className="p-4 md:p-8 w-full max-w-full">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-black text-white py-6 px-8 rounded-2xl w-11/12 mx-auto flex flex-col justify-center items-center mb-4">
            <p className="font-bold text-2xl md:text-3xl mb-3">Sisa Saldo</p>
            <p className="text-center font-bold text-3xl md:text-6xl">
              {formatRupiah(saldo)}
            </p>
          </div>
          <div className="flex flex-row w-11/12 mb-3">
            <div className="w-3/4 md:w-1/2 relative">
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block p-3 md:p-4 pl-10 md:pl-10 w-full text-xs md:text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
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
              </div>
            </div>
          </div>
          <div className="w-11/12 overflow-x-auto max-w-full">
            <div className="bg-white shadow-md rounded-lg p-2 md:p-4 mb-2 flex items-center">
              <p className="text-gray-800 font-semibold md:font-bold md:w-auto text-xs md:text-base flex-1 text-center mb-2 md:mb-0">
                Nomor Invoice
              </p>
              <p className="text-gray-800 font-semibold md:font-bold md:w-auto text-xs md:text-base flex-1 text-center mb-2 md:mb-0">
                Tanggal Transaksi
              </p>
              <p className="text-gray-800 font-semibold md:font-bold md:w-auto text-xs md:text-base flex-1 text-center mb-2 md:mb-0">
                Total Bayar
              </p>
              <p className="text-gray-800 font-semibold md:font-bold md:w-auto text-xs md:text-base flex-1 text-center mb-2 md:mb-0">
                Jenis
              </p>
              <p className="text-gray-800 font-semibold md:font-bold md:w-auto text-xs md:text-base flex-1 text-center mb-2 md:mb-0">
                Struk
              </p>
            </div>
          </div>
          <div className="w-11/12">
          {currentTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`bg-white shadow-md rounded-lg p-3 mb-2 flex flex-col md:flex-row items-start md:items-center ${
                index === transactions.length - 1 ? "mb-3" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center w-full">
              <p className="text-gray-800 flex-1 font-normal text-center text-sm md:text-base">
                {transaction.invoice}
              </p>
              <p className="text-gray-800 flex-1 font-normal text-center text-sm md:text-base">
                {transaction.transaction_date}
              </p>
              <p className="text-gray-800 flex-1 font-normal text-center text-sm md:text-base">
                {formatRupiah(transaction.total_amount)}
              </p>
              <p className="text-gray-800 flex-1 font-normal text-center text-sm md:text-base mb-2 mr-0 md:mr-24">
                {transaction.transaction_type}
              </p>
              <button
                onClick={() => handleDetailTransactionClick(transaction)}
                className="bg-black hover:bg-yellow-500 text-white rounded-lg text-xs md:text-sm px-4 py-2 mr-0 md:mr-24"
              >
                Detail
              </button>
            </div>
             </div>
            ))}
          </div>
          <div className="flex mt-4 mb-7">
            {[
              ...Array(Math.ceil(transactions.length / transactionsPerPage)),
            ].map((_, index) => (
              <button
                key={index}
                className={`bg-grey-400 hover:bg-gray-300 px-3 py-1 rounded mx-1 ${
                  currentPage === index + 1 ? "bg-black" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
             
            ))}
          </div>
        </div>
      </div>
      {selectedTransaction && (
        <DetailTransaction
          transaction={selectedTransaction}
          onClose={handleCloseDetailTransaction}
        />
      )}
    </div>
  );
}
