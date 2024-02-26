import React from "react";
import companyLogo from "../assets/companylogo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbFileInvoice, TbLogout } from "react-icons/tb";

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: window.location.pathname.slice(1) || "dashboard",
    };
  }

  setActivePage = (page) => {
    this.setState({ activePage: page });
  };

  logOut = () => {
    localStorage.clear();
    window.location = "/";
  };

  render() {
    const { activePage } = this.state;

    return (
      <aside className="sidebar w-64 md:shadow-md transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white shadow">
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex flex-row items-center">
          <img src={companyLogo} alt="Company Logo" className="h-12 mt-8 mb-4" />
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              {/* Dashboard */}
              <a
                href="/dashboard"
                onClick={() => this.setActivePage("dashboard")}
                className={`flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 ${
                  activePage === "dashboard" ? "bg-sky-200" : ""
                }`}
              >
                <span className="mr-2 flex items-center justify-center text-lg text-gray-400">
                  <LuLayoutDashboard color="#0c4a6e" />
                </span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className="my-px">
              {/* Invoice */}
              <a
                href="/invoice"
                onClick={() => this.setActivePage("invoice")}
                className={`flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 ${
                  activePage === "invoice" ? "bg-sky-200" : ""
                }`}
              >
                <span className="mr-2 flex items-center justify-center text-lg text-gray-400">
                  <TbFileInvoice color="#0c4a6e" />
                </span>
                <span className="ml-3">Invoice</span>
              </a>
            </li>
            <li className="my-px">
              {/* Logout */}
              <a
                href="/"
                className="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-200 hover:text-gray-700 mt-60"
                onClick={(e) => {
                  e.preventDefault(); 
                  this.logOut(); 
                }}
              >
                <span className="mr-3 flex items-center justify-center text-lg text-red-400">
                  <TbLogout />
                </span>
                <span className="ml-2 text-lg text-red-500">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}
