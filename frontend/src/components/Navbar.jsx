import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="w-full text-navColor flex flex-row items-center gap-4 shadow-md px-4 py-2">
      <div className="flex-auto rounded-sm flex items-center ps-2 py-2 focus-within:shadow-md border-black">
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
            className="caret-gray-400 flex-auto bg-transparent focus:outline-none"
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

export default Navbar;
