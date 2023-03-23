import { useState, useEffect, useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { API_URL } from "../config";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestuarants] = useState([]);
  const [filteredRestaurants, setFilteredRestuarants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    setIsLoading(true);
    const data = await fetch(API_URL);
    const json = await data.json();
    const restaurants = json?.data?.cards[2]?.data?.data?.cards;
    if (restaurants && restaurants.length > 0) {
      setAllRestuarants([...allRestaurants, ...restaurants]);
      setFilteredRestuarants([...allRestaurants, ...restaurants]);
      page.current += 1;
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !isLoading &&
      hasMore
    ) {
      getRestaurants();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]);

  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <h1 className="m-10 flex justify-center text-center text-3xl font-bold font-sans">
        🛑Offline!!Check Your Internet!
      </h1>
    );
  }

  //early return
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className=" bg-slate-50 flex-grow">
        {/* {search bar} */}
        <div className="py-12 flex items-center justify-center">
          <div className="flex justify-between w-1/3 border border-slate-400 border-1 focus:w-2/3 ">
            <input
              data-testid="search-sinput"
              type="text"
              className="p-3 grow h-12 w-[90%] focus:outline-none"
              placeholder="Search for restaurants"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              data-testid="search-btn"
              className="p-3"
              onClick={() => {
                const filtedData = filterData(searchText, allRestaurants);
                setFilteredRestuarants(filtedData);
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className="flex flex-wrap  text-center justify-center"
          data-testid="res-list"
        >
          {filteredRestaurants?.length === 0 ? (
            <p className="w-full font-bold text-center">No Restaurants Found</p>
          ) : (
            filteredRestaurants.map((restaurant, index) => {
              return (
                <Link
                  key={index}
                  to={"/restaurant/" + restaurant.data.id}
                >
                  {" "}
                  <RestaurantCard {...restaurant.data} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
