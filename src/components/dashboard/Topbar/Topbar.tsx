/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Topbar: React.FC<{ onHamburgerClick: () => void }> = ({
  onHamburgerClick,
}) => {
  // get notification

  // fksdflk

  const token = Cookies.get("token");

  let decodedToken: any = null;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      decodedToken = null;
    }
  }

  console.log("decode token details", decodedToken)

  return (
    <header className="bg-gray-50 shadow-sm py-6 px-6 lg:px-16 w-full">
      <div className="flex justify-between items-center flex-wrap">
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={onHamburgerClick}
        >
          <AiOutlineMenu />
        </button>

        {/* Welcome Message */}
        <h1 className="text-[#161616] flex items-center gap-2 text-[16px] sm:text-[20px] font-medium">
          Welcome, {decodedToken?.name}
        </h1>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Add notification icon here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
