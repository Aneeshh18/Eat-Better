import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import RestaurantCard from "./RestaurantCard";
import useOnline from "../utils/useOnline";
import { API_URL } from "../config";
import Banner from "../Images/Banner.jpg";
import BodyShimmer from "./BodyShimmer";
import { filterData, getNumberFromString } from "../utils/helper";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const isOnline = useOnline();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetch(API_URL);
        const json = await data.json();

        const resData =
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        //console.log("Fetched data:", resData);
        setAllRestaurants(resData);
        setFilteredRestaurants(resData);
      } catch (error) {
        console.log("There was an error ", error);
      }
    };

    getRestaurants();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    const filteredData = filterData(e.target.value, allRestaurants);
    console.log("Filtered restaurants:", filteredRestaurants);
    setFilteredRestaurants(filteredData);
  };

  const handleFilter = (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      // console.log(event.target.tagName);
      if (event.target.dataset.filtertype === "RELEVANCE") {
        setFilteredRestaurants(allRestaurants);
      } else if (event.target.dataset.filtertype === "DELIVERY_TIME") {
        let res = [...filteredRestaurants];
        res.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
        setFilteredRestaurants(res);
      } else if (event.target.dataset.filtertype === "RATING") {
        // console.log(event.target.dataset.filtertype);
        let res = [...filteredRestaurants];
        res.sort((a, b) => b.info.avgRatingString - a.info.avgRatingString);
        console.log(res);
        setFilteredRestaurants(res);
      } else if (event.target.dataset.filtertype === "COST_FOR_TWO_L2H") {
        // console.log(event.target.dataset.filtertype);
        let res = [...filteredRestaurants];
        res.sort(
          (a, b) =>
            getNumberFromString(a.info.costForTwo) -
            getNumberFromString(b.info.costForTwo)
        );
        setFilteredRestaurants(res);
      } else if (event.target.dataset.filtertype === "COST_FOR_TWO_H2L") {
        // console.log(event.target.dataset.filtertype);
        let res = [...filteredRestaurants];
        res.sort(
          (a, b) =>
            getNumberFromString(b.info.costForTwo) -
            getNumberFromString(a.info.costForTwo)
        );
        setFilteredRestaurants(res);
      }
    }
  };

  const debouncedSearch = useMemo(
    () => debounce(handleSearchInputChange, 300),
    []
  );

  if (!isOnline) {
    return <OfflineMessage />;
  }

  if (!allRestaurants || !allRestaurants.length) {
    return <BodyShimmer />;
  }

  return (
    <>
      <div className="w-[80vw] flex flex-col justify-center">
        <div className="bg-slate-50 flex flex-col items-center justify-center ">
          <div className="banner-section relative h-[25rem] md:h-[30rem] lg:h-[30rem] flex  items-center w-full">
            <img
              src={Banner}
              className="h-full w-full absolute object-cover text-opacity-95 "
              alt="food background image"
              loading="lazy"
            ></img>

            {/* {search bar} */}
            <div className="my-12 flex flex-grow items-center justify-center  z-[2]">
              <div className="flex justify-between w-1/3 border border-slate-600 border-1 focus:w-2/3 rounded-lg overflow-hidden">
                <input
                  data-testid="search-input"
                  ref={searchInputRef}
                  type="text"
                  className="p-3 grow h-12 w-[90%] focus:outline-none"
                  placeholder="Search for Restaurants"
                  value={searchText}
                  onChange={handleSearchInputChange}
                />
                <button
                  id="search-btn"
                  data-testid="search-btn"
                  className="p-3 bg-black/80"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="white"
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
          </div>

          {/* restaurants */}

          <div className="">
            <div className="filterHeader lg:px-12 md:px-4 border-b-2 flex justify-between my-8 ">
              <span className="text-[26px] font-semibold  text-gray-800 whitespace-nowrap">
                {filteredRestaurants.length} restaurants
              </span>
              <div
                className="filterList flex gap-4 px-2   text-slate-600 whitespace-nowrap font-semibold"
                onClick={(e) => handleFilter(e)}
              >
                <button
                  className="hover:border-b border-black hover:text-black "
                  data-filtertype="RELEVANCE"
                >
                  Relevance
                </button>
                <button
                  className="hover:border-b border-black hover:text-black "
                  data-filtertype="DELIVERY_TIME"
                >
                  Delivery Time
                </button>
                <button
                  className="hover:border-b border-black hover:text-black "
                  data-filtertype="RATING"
                >
                  Rating
                </button>
                <button
                  className="hover:border-b border-black hover:text-black "
                  data-filtertype="COST_FOR_TWO_L2H"
                >
                  Cost: Low To High
                </button>
                <button
                  className="hover:border-b border-black hover:text-black"
                  data-filtertype="COST_FOR_TWO_H2L"
                >
                  Cost: High To Low
                </button>
              </div>
            </div>
            <div
              className="restaurant flex flex-wrap justify-center  "
              data-testid="res-list"
            >
              {filteredRestaurants?.length === 0 ? (
                <p className="w-full font-bold text-center">
                  No Restaurants Found
                </p>
              ) : (
                filteredRestaurants.map((restaurant, index) => {
                  return (
                    <Link key={index} to={"/restaurant/" + restaurant.info.id}>
                      {" "}
                      <RestaurantCard {...restaurant?.info} />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OfflineMessage = () => (
  <h1 className="m-4 md:m-10 text-center text-2xl md:text-3xl font-bold font-sans">
    🛑 Offline!! Check Your Internet!
  </h1>
);

export default Body;
