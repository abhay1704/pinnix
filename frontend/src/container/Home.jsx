import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.png";
import client from "../client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Feed from "./Feed";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetch";

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userInfo = fetchUser();

  useEffect(() => {
    if (!userInfo) {
      localStorage.clear();
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userInfo?._id) return;
    const query = userQuery(userInfo?._id);
    client
      .fetch(query)
      .then((res) => {
        setUser(res[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userInfo?._id]);

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className=" hidden md:flex flex-col w-1/4 min-w-80 p-2 shadow-md h-screen sticky top-0">
        <Sidebar user={user} />
      </div>
      <div className=" flex w-full md:hidden p-4 flex-row justify-between items-center bg-gray-50">
        <Link src="#" className="" onClick={() => setSidebarOpen(true)}>
          <GiHamburgerMenu fontSize={30} />
        </Link>
        <Link src="/">
          <img src={logo} width={130} alt="logo" />
        </Link>
        <div className="w-8 h-8">
          {user && (
            <img
              className="object-contain w-full h-full rounded-md"
              src={user.image}
              alt="user-profile"
            />
          )}
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed w-2/3 h-screen bg-white animate-slide-in z-[2000]">
          <Sidebar user={user} setSidebarOpen={setSidebarOpen} />
        </div>
      )}
      <div className="content flex-auto min-h-scren">
        <Navbar user={user} />
        <Feed />
      </div>
    </div>
  );
};

export default Home;
