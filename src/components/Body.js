import { useState, useEffect, useRef } from "react";
import { API_URL, API_URL2 } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestuarants] = useState([]);
  const [filteredRestaurants, setFilteredRestuarants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalOpenRestaurants = useRef(0);

  async function getRestaurants(url) {
    try {

      const data = await fetch(url);
      const json = await data.json();
      if (url === API_URL) {
        json?.data?.cards.forEach((card) => {
          if (card.cardType === "seeAllRestaurants") {
            setAllRestaurants(card?.data?.data?.cards);
            setfilteredRestaurants(card?.data?.data?.cards);
            totalOpenRestaurants.current =
              card?.data?.data?.totalOpenRestaurants;
          }
        });
      } else {
        const arr = json?.data?.cards;
        const restaurantList = arr.map((item) => {
          return item?.data;
        });
        setAllRestaurants([...allRestaurants, ...restaurantList]);
        setfilteredRestaurants([...filteredRestaurants, ...restaurantList]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("There was an error", error);
    }
  }



  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.scrollHeight &&
        offset + 16 <= totalOpenRestaurants.current
      ) {
        setIsLoading(true);
        setOffset(offset + 16);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (offset) {
      getRestaurants(`${API_URL2}offset=${offset}&`);
    }
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [offset]);


  const isOnline = useOnline();

  if (!isOnline) {
    return <h1>🛑Offline!!Check Your Internet!</h1>;
  }



  //early return
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className=" flex-grow">
        {/* {search bar} */}
        <div className="my-12 flex items-center justify-center">
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
            filteredRestaurants.map((restaurant) => {
              return (
                <Link
                  key={restaurant.data.id}
                  to={"/restaurant/" + restaurant.data.id}
                >
                  <RestaurantCard {...restaurant.data} />
                </Link>
              );
            })
          )}
          {isLoading && <Shimmer />}
        </div>
      </div>
    </>
  );
};

export default Body;
