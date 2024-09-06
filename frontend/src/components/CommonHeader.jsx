import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CommonHeader = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div className="w-full text-navColor flex flex-row items-center gap-4 shadow-md px-4 py-2">
      <Link
        to={"/home"}
        className="text-lg flex gap-2 items-center text-gray-600"
      >
        <FaHome fontSize={20} />
        Home
      </Link>
      <div className="flex-auto rounded-sm flex items-center ps-2 focus-within:border-1 border-black">
        <form
          className="flex w-full gap-4 ps-4 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${search}`);
          }}
        >
          <IoMdSearch fontSize={20} className="max-w-6 flex-1" />
          <input
            type="text"
            className="flex-auto bg-transparent focus:outline-none"
            name="search"
            autoComplete="off"
            placeholder="Search"
            fontSize={16}
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {user && (
        <>
          <Link
            to={`/user-profile/${user._id}`}
            className="flex flex-1 justify-end items-center gap-2 h-4 py-2 max-w-fit"
          >
            <img
              className="rounded-md object-contain"
              width={30}
              height={30}
              src={user.image}
              alt="user-profile"
            />
          </Link>
          <Link
            to={"/create-pin"}
            className="bg-black text-white  w-4 h-6 p-4 rounded-md flex items-center justify-center"
          >
            +
          </Link>
        </>
      )}
    </div>
  );
};

export default CommonHeader;
