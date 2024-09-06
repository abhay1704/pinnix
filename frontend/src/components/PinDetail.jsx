import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import client, { urlFor } from "../client";
import Spinner from "./Spinner";
import { getPin, getSimilarPins } from "../utils/data";
import Masonry from "react-masonry-css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CommonHeader from "./CommonHeader";

const PinDetail = ({ user }) => {
  const { id } = useParams();
  const [pin, setPin] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [height, setHeight] = useState(100);
  const imageParent = useRef(null);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const pinQuery = getPin(id);
    client.fetch(pinQuery).then((res) => {
      setPin(res[0]);
      window.scroll(0, 0);
    });
  }, [id]);

  useEffect(() => {
    if (!pin) return;
    const fetchSimilarQuery = getSimilarPins(pin?.title, pin?.category);
    client
      .fetch(fetchSimilarQuery)
      .then((res) => setSimilar(res.filter((p) => p._id !== pin._id)));
  }, [pin]);

  if (!pin)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner message={"Fetching Pin Details..."} />
      </div>
    );

  const deletePin = (id) => {
    client.delete(id).then((res) => {
      window.location.replace("/");
      window.location.reload();
    });
  };

  return (
    <div className="w-full text-center">
      <CommonHeader user={user} />
      <div className="w-[90%] max-w-screen-lg mx-auto flex flex-col text-left shadow-md p-6 md:p-8">
        <a
          target="_blank"
          rel="noreferrer"
          href={urlFor(pin?.image)?.maxWidth().url()}
          className="w-full h-[80vh] inline-block relative"
          ref={imageParent}
        >
          <img
            className="w-full h-full object-cover object-top rounded-md"
            src={urlFor(pin?.image)
              ?.height(parseInt(height * 0.8))
              ?.fit("scale")
              ?.url()}
            alt={pin?.title || "Pin image"}
          />
        </a>
        <div className="flex justify-between flex-row items-center pe-2">
          <h1 className="text-3xl mt-6 font-bold">{pin?.title}</h1>
          {user._id === pin?.owner?._id && (
            <div className="w-20 flex flex-row items-center gap-3 justify-end">
              <Link to={`/update-pin/${pin?._id}`}>
                <FaEdit className="text-2xl py-0.5 text-[#007BFF]" />
              </Link>
              <button onClick={() => deletePin(id)}>
                <MdDelete className="text-2xl text-[#ed4556]" />
              </button>
            </div>
          )}
        </div>
        <p className="text-lg text-gray-600 tracking-wide mt-4">
          {pin?.content}
        </p>
        <Link
          to={`/user-profile/${pin?.owner?._id}`}
          className="flex items-center gap-4 my-6"
        >
          <img
            className="rounded-md object-cover"
            height={30}
            width={30}
            src={pin?.owner?.image}
            alt="user profile"
          />
          <div className="text-md font-semibold">{pin?.owner?.userName}</div>
        </Link>

        <h3 className="bg-gray-400 capitalize text-[#071226] shadow-sm w-fit py-1 px-3 rounded-md mb-4">
          {pin?.category}
        </h3>
        <h3 className="mb-6">
          Pin Destination URL:{" "}
          <a
            className="font-semibold text-blue-600 underline"
            href={pin?.destination}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pin?.destination?.slice(0, 40) + "..."}
          </a>
        </h3>
        {similar && similar.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">More Like This</h2>
            <Masonry
              className="my-masonry-grid lg:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-2"
              columnClassName="my-masonry-grid_column"
            >
              {similar.map((similarPin) => (
                <div key={similarPin._id} className="m-2">
                  <Link to={`/pin-detail/${similarPin._id}`}>
                    <img
                      src={urlFor(similarPin.image).width(400).url()}
                      alt={similarPin.title}
                      className="w-full rounded-md"
                    />
                    <h2 className="text-lg mt-2  ">{similarPin.title}</h2>
                  </Link>
                </div>
              ))}
            </Masonry>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinDetail;
