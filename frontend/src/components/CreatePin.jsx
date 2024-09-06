import React, { useState } from "react";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { Link, replace, useNavigate } from "react-router-dom";
import { categories } from "../utils/data";
import { IoMdCloudUpload } from "react-icons/io";
import client, { urlFor } from "../client";
import Spinner from "./Spinner";
import { capitalize } from "../utils/helpers";

const CreatePin = ({ user }) => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [creatingPin, setCreatingPin] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImageUploading(true);
    const file = e.target.files[0];
    client.assets
      .upload("image", file, {
        filename: file.name,
      })
      .then((res) => {
        setImageUploading(false);
        setImage({
          _id: res._id,
          url: res.url,
        });
      });
  };

  const createPin = () => {
    if (!title || !content || !destination || !category || !image) {
      alert("Please fill in all fields");
      return;
    }

    setCreatingPin(true);

    const doc = {
      _type: "pin",
      title,
      content,
      destination,
      category,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image._id,
        },
      },
      owner: {
        _type: "reference",
        _ref: user._id,
      },
    };

    client.create(doc).then((res) => {
      setCreatingPin(false);
      const _id = res._id;
      window.location.replace(`/pin-detail/${_id}`);
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-white">
        <div className="bg-slate-50 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <IoWarningOutline fontSize={48} className="text-red-400 mb-4" />
          <h1 className="text-2xl font-bold text-red-400 mb-2">
            User Not Authenticated
          </h1>
          <p className="text-gray-700 mb-4">
            Please log in to access this page.
          </p>
          <Link
            to={"/login"}
            className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (creatingPin) {
    return (
      <div className="w-full h-screen">
        <Spinner message="Creating Pin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-2 md:p-4 bg-[#f7f7f7] text-[#333333] flex items-center justify-center">
      <form
        className="flex flex-col gap-6 shadow-sm p-2  w-full md:w-3/4 md:p-6 bg-white rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          createPin();
        }}
      >
        <h1 className="text-3xl font-bold text-[#333333]">Create Pin</h1>

        <div className="relative">
          <input
            type="text"
            className="peer p-4 bg-[#ffffff] border border-[#cccccc] rounded-md outline-none shadow-sm hover:outline-none w-full transition-all duration-200 ease-in-out"
            name="title"
            aria-label="title"
            placeholder=" "
            id="title"
            value={title}
            onInput={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="title"
            className="absolute left-3 -top-2 text-gray-500 text-sm bg-[#ffffff] px-1 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Title
          </label>
        </div>

        <div className="relative">
          <textarea
            name="content"
            className="peer p-4 bg-[#ffffff] border border-[#cccccc] rounded-md outline-none shadow-sm hover:outline-none w-full transition-all duration-200 ease-in-out min-h-20 max-h-50"
            aria-label="content"
            placeholder=" "
            id="content"
            value={content}
            onInput={(e) => setContent(e.target.value)}
          ></textarea>
          <label
            htmlFor="content"
            className="absolute left-3 -top-2 text-gray-500 text-sm bg-[#ffffff] px-1 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Content
          </label>
        </div>

        <div className="h-72">
          {!image ? (
            <>
              <input
                type="file"
                className="hidden "
                name="image"
                aria-label="image"
                placeholder=" "
                id="image"
                accept="image/*"
                onInput={handleImageUpload}
              />
              <label
                htmlFor="image"
                className="flex items-center flex-col justify-center p-4 bg-slate-400 text-white rounded-md transition-colors duration-200 ease-in-out cursor-pointer h-full"
              >
                {imageUploading ? (
                  <Spinner message={"Uploading Image"} />
                ) : (
                  <>
                    <IoMdCloudUpload fontSize={40} />
                    Upload Image
                  </>
                )}
              </label>
            </>
          ) : (
            <div className="w-full h-full relative">
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-colors duration-200 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                }}
              >
                <IoClose fontSize={24} />
              </button>
              <img
                className="w-full h-full max-w-md mx-auto object-cover object-center rounded-md"
                src={urlFor(image.url).width(500).url()}
                alt="post"
              />
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            className="peer p-4 bg-[#ffffff] border border-[#cccccc] rounded-md outline-none shadow-sm hover:outline-none w-full transition-all duration-200 ease-in-out"
            name="destination"
            aria-label="destination"
            placeholder=" "
            id="destination"
            value={destination}
            onInput={(e) => setDestination(e.target.value)}
          />
          <label
            htmlFor="destination"
            className="absolute left-3 -top-2 text-gray-500 text-sm bg-[#ffffff] px-1 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Destination URL
          </label>
        </div>

        <div className="relative">
          <select
            name="category"
            id="category"
            className="peer p-4 bg-[#ffffff] border border-[#cccccc] rounded-md outline-none shadow-sm hover:outline-none w-full transition-all duration-200 ease-in-out"
            value={category}
            onInput={(e) => setCategory(e.target.value)}
          >
            <option
              value=""
              // selected={true}
              disabled={true}
              className="p-2 bg-[#ffffff] border-[#cccccc] border-spacing-1 outline-none shadow-sm hover:outline-none w-full"
            >
              Category
            </option>
            {categories.map((category) => (
              <option
                key={category.name}
                value={category.name}
                className="p-2 bg-[#ffffff] border-[#cccccc] border-spacing-1 outline-none shadow-sm hover:outline-none w-full"
              >
                {capitalize(category.name)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-[#2D9CDB] text-white rounded-md hover:bg-[#1b8bca] transition-colors duration-200 ease-in-out"
        >
          Create Pin
        </button>
      </form>
    </div>
  );
};

export default CreatePin;