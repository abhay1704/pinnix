import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useParams, useSearchParams } from "react-router-dom";
import { searchFeed, searchQuery, searchCategory } from "../utils/data.js";
import client from "../client";
import Masonary from "react-masonry-css";
import Pins from "../components/Pins";

const breakpoints = {
  default: 3,
  1600: 4,
  1200: 3,
  900: 2,
  500: 1,
};

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    let query;
    if (category) {
      query = searchCategory(category);
    } else if (searchParams.has("q")) {
      const searchTerm = searchParams.get("q");
      query = searchQuery(searchTerm);
    } else {
      query = searchFeed;
    }

    client
      .fetch(query)
      .then((res) => {
        setFeed(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Ensure loading state is reset on error
      });
  }, [category, searchParams]); // Include only the specific dependencies

  if (loading) {
    return (
      <div className="w-full flex-auto h-1/2">
        <Spinner message="Loading Feed" />
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="w-full flex-auto h-[70vh] flex justify-center items-center">
        <h1 className="text-center text-2xl">No Pins Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Masonary
        breakpointCols={breakpoints}
        className="my-masonry-grid w-full p-2 lg:p-4"
        columnClassName="my-masonry-grid_column"
      >
        {feed?.map((item, idx) => (
          <Pins pins={item} key={idx} />
        ))}
      </Masonary>
    </div>
  );
};

export default Feed;
