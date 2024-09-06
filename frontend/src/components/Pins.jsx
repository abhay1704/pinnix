import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { urlFor } from "../client";
import { FaDownload } from "react-icons/fa";
import client from "../client";
import { fetchUser } from "../utils/fetch";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const Pins = ({ pins: { image, title, _id, save, destination } }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const user = useMemo(() => fetchUser(), []);
  const alreadySaved = useMemo(
    () => save?.some((x) => x._ref === user?._id),
    [save, user]
  );

  useEffect(() => {
    if (!user) {
      localStorage.clear();
      navigate("/login");
    }
  }, [user, navigate]);

  const savePin = async () => {
    if (alreadySaved) return;

    setSaving(true);

    client
      .patch(_id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _type: "reference",
          _ref: user._id,
        },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
          setSaving(false);
        }, 1000);
      });
  };

  const removePin = () => {
    if (!alreadySaved) return;

    client
      .patch(_id)
      .unset([`save[_ref=="${user._id}"]`])
      .commit()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="m-2">
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={urlFor(image).width(400).url()}
          alt={title}
          className="w-full h-auto"
        />
        {hover && (
          <div
            onClick={() => {
              navigate(`/pin-detail/${_id}`);
            }}
            className="absolute top-0 w-full h-full bg-blackOverlay"
          >
            <a
              className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 cursor-pointer"
              href={urlFor(image)
                .forceDownload(
                  `${title.toLowerCase().replace(/\s+/g, "-")}.${image
                    .split(".")
                    .pop()}`
                )
                .url()}
              onClick={(e) => e.stopPropagation()}
            >
              <FaDownload />
            </a>
            {alreadySaved ? (
              <button
                className="absolute top-2 right-2 p-4 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removePin();
                }}
              >
                Saved
              </button>
            ) : (
              <button
                className="absolute top-2 right-2 p-4 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  savePin();
                }}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
            <div className="bg-white text-black rounded-lg absolute bottom-2 left-2 flex flex-row gap-2 items-center">
              <BsArrowUpRightCircleFill className="h-full w-6 ms-2" />
              <a
                href={destination}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black w-full rounded-lg h-full py-1 px-2 "
                onClick={(e) => e.stopPropagation()}
              >
                {" "}
                {destination?.slice(0, 20) + "..."}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default Pins;
