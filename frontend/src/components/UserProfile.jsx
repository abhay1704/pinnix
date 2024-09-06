import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../client";
import Spinner from "./Spinner";
import Masory from "react-masonry-css";
import { userPinsQuery } from "../utils/data";
import CommonHeader from "./CommonHeader";
import { LuRefreshCw } from "react-icons/lu";
import { FALLBACK_BANNER } from "../utils/fetch";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [banner, setBanner] = useState(FALLBACK_BANNER);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    client
      .fetch(`*[ _type=="user" && _id =='${id}']{...}`)
      .then((res) => {
        setUser(res[0]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Fetch user pins
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    client
      .fetch(userPinsQuery(id))
      .then((res) => {
        setPins(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Refresh banner function
  const refreshBanner = async () => {
    setBannerLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_CLIENT}&orientation=landscape&topics=bo8jQKTaE0Y,6sMVjTLSkeQ,aeu6rL-j6ew`
      );
      const data = await res.json();
      const url = data?.urls?.full;
      if (url) {
        const image = new Image();
        image.src = url;
        image.addEventListener("load", () => {
          setBannerLoading(false);
          setBanner(url);
        });
      }
    } catch (err) {
      setBanner(FALLBACK_BANNER);
      setBannerLoading(false);
      console.error("Error fetching banner:", err);
    }
  };

  // Only call refreshBanner on component mount
  useEffect(() => {
    refreshBanner();
  }, []); // No dependencies, so it runs only once when component mounts

  if (loading)
    return (
      <div className="w-full h-screen">
        <Spinner />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <CommonHeader user={user} />
      <div className="p-2 mx-auto lg:p-4 w-full max-w-screen-lg text-center">
        <div className="w-full md:w-3/4 flex flex-col mx-auto text-left -mb-10 relative">
          {!bannerLoading ? (
            <button
              className="absolute right-2 top-2 p-2 h-8 w-8 rounded-full bg-white text-black flex items-center justify-center cursor-pointer"
              onClick={refreshBanner} // Use onClick correctly here
            >
              <LuRefreshCw />
            </button>
          ) : (
            <div className="absolute top-0 left-0 w-full h-[70vh] z-10">
              <Spinner />
            </div>
          )}
          <img
            className={
              "rounded-md object-cover w-full h-[70vh]" +
              (bannerLoading
                ? " bg-gradient-to-tr from-[#8991b2] to-transparent relative -z-10"
                : "")
            }
            src={banner}
            alt="user-profile"
          />
          <div className="img w-25 h-25 mx-auto -translate-y-[50%]">
            <img
              className="w-full h-full object-contain rounded-full"
              src={user?.image}
              alt=""
            />
          </div>
          <div className="mb-5">
            <h1 className="text-2xl mt-4">{user?.userName}</h1>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
          {pins && pins.length > 0 && (
            <div>
              <h2 className="text-xl mt-4">Top Pins</h2>
              <Masory
                className="w-full my-masonry-grid p-2 lg:p-4 gap-1"
                columnClassName="my-masonry-grid_column"
              >
                {pins.map((pin) => (
                  <Link
                    key={pin?._id}
                    to={`/pin-detail/${pin?._id}`}
                    className="w-full mb-1"
                  >
                    <div className="bg-white rounded-md p-2 shadow-md my-1">
                      <img
                        className="w-full object-cover rounded-md"
                        src={pin?.image}
                        alt=""
                      />
                      <h3 className="text-lg mt-2">{pin?.title}</h3>
                    </div>
                  </Link>
                ))}
              </Masory>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
