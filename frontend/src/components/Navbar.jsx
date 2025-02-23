import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext, useState } from "react";
import { Appcontext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  // States
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(Appcontext);

  const logout = async () => {
    setShowMenu(false);
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-500">
      {/* Logo */}

      <div className="flex gap-1 justify-center items-center">
        <NavLink to={"/"}>
          <img className="w-44 cursor-pointer" src={assets.logo} alt="logo" />
        </NavLink>
          {/* http://localhost:5174/ */}
        <NavLink to="https://perscripto-admin.onrender.com" className="px-2 py-1 border-black  border-2 rounded-full ">
          Admin
        </NavLink>
      </div>

      {/* Main Navigation Links */}
      <ul className="hidden md:flex gap-4 items-center font-medium">
        <NavLink to={"/"} className="py-1">
          HOME
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"} className="py-1">
          All Doctors
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"} className="py-1">
          ABOUT
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="py-1">
          Contacts
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
      </ul>

      {/* Profile and Menu */}
      <div className="flex items-center gap-4">
        {/* Conditionally Render Dropdown or Create Account Button */}
        {token ? (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img src={userData.image} className="w-8 rounded-full" />
              <img src={assets.dropdown_icon} className="w-2.5" />
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                <p
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/my-profile");
                  }}
                >
                  My Profile
                </p>
                <p
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/my-appointments");
                  }}
                >
                  My Appointments
                </p>
                <p
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 text-[12px] font-light rounded-full hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="md:hidden w-6"
          src={assets.menu_icon}
          alt="menuIcon"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="w-full flex justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="py-2 px-4 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="py-2 px-4 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="py-2 px-4 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="py-2 px-4 rounded inline-block">Contact Us</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
