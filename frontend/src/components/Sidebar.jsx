import React, { act, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
import { FaHome } from "react-icons/fa";

const getClass = (isActive) => {
  return isActive
    ? "bg-gray-200 text-black flex items-center flex-row gap-4 text-md py-1  my-2 border-r-4 border-black transition-all duration-300"
    : "text-gray-500 hover:text-gray-900 flex items-center flex-row gap-4 py-1 text-md my-2 transition-all duration-300 ease-in-out";
};

const Sidebar = ({ user, setSidebarOpen }) => {
  return (
    <div className="w-full h-screen sticky">
      {setSidebarOpen && (
        <Link
          className="absolute top-2 right-2"
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <IoIosClose fontSize={35} />
        </Link>
      )}

      <div className="flex flex-col justify-start h-full ps-4 gap-1">
        <div className="flex justify-start items-center mb-6 py-2">
          <img width={130} src={logo} alt="logo" />
        </div>
        <div className="w-full max-h-[75vh] overflow-y-scroll no-scroller">
          <NavLink
            to="/home"
            className={({ isActive }) => {
              return getClass(isActive);
            }}
            onClick={() => {
              if (setSidebarOpen) setSidebarOpen(false);
            }}
          >
            <FaHome fontSize={25} />
            Home
          </NavLink>
          <h3 className="text-gray-600 text-md py-2">Discover Categories</h3>
          {categories.map(({ name, image }, index) => (
            <NavLink
              key={name}
              to={`/category/${name.toLowerCase()}`}
              className={({ isActive }) => {
                return getClass(isActive);
              }}
              onClick={() => {
                if (setSidebarOpen) setSidebarOpen(false);
              }}
            >
              <div className="w-10 h-10">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <Link
          to={"/user-profile/" + user._id}
          className="absolute bottom-6 left-4 flex flex-row gap-4"
        >
          <img
            className="rounded-md object-contain"
            height={30}
            width={30}
            src={user.image}
            alt="user-profile"
          />
          <div className="text-md">Abhay Pratap Singh</div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
