import { useState, useEffect, useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { filterData, getNumberFromString  } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { API_URL, API_URL3 } from "../config";
import BodyShimmer from "./BodyShimmer";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalOpenRestaurants = useRef(0);
  const searchInputRef = useRef(null);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  async function getRestaurants(url) {
    try {
      const data = await fetch(url);
      const json = await data.json();
      // console.log(json);
      if (url === API_URL) {
        const resData =
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        //console.log(resData);
        setAllRestaurants(resData);
        setFilteredRestaurants(resData);
        totalOpenRestaurants.current = json?.data?.data?.totalOpenRestaurants;
        //console.log(totalOpenRestaurants.current);
        setTotalRestaurants(20);
      } else {
        const arr = json?.data?.cards;
        if (arr) {
          const restaurantList = arr.map((item) => item?.data);
          setAllRestaurants([...allRestaurants, ...restaurantList]);
          setFilteredRestaurants([...filteredRestaurants, ...restaurantList]);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("There was an error ", error);
    }
  }

  const handelInfiniteScroll = async () => {
    try {
      if (
        !isFetching && // Prevent additional fetches
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.scrollHeight &&
        offset + 16 <= totalOpenRestaurants.current
      ) {
        setIsLoading(true);
        // await getRestaurants(`${API_URL}offset=${offset}&`);
        setOffset(offset + 16);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants(API_URL);
    setOffset(0);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handelInfiniteScroll);
      setIsFetching(false);
    };
  }, [offset, isFetching]);

  useEffect(() => {
    console.log("useEffect called offset", offset);
    if (offset) {
      getRestaurants(`${API_URL3}offset=${offset}&`);
    }
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [offset]);

  


  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    const filtedData = filterData(e.target.value, allRestaurants);
    setFilteredRestaurants(filtedData);
  };

  function handleFilter(event) {
    
    if (event.target.tagName.toLowerCase() === "button") {
      // console.log(event.target.tagName);
      if (event.target.dataset.filtertype === "RELEVANCE") {
        setFilteredRestaurants(allRestaurants);
      } else if (event.target.dataset.filtertype === "DELIVERY_TIME") {
        let rest = [...filteredRestaurants];
        rest.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
        setFilteredRestaurants(rest);
      } else if (event.target.dataset.filtertype === "RATING") {
        // console.log(event.target.dataset.filtertype);
        let rest = [...filteredRestaurants];
        rest.sort((a, b) => b.info.avgRatingString - a.info.avgRatingString);
        console.log(rest);
        setFilteredRestaurants(rest);
      } else if (event.target.dataset.filtertype === "COST_FOR_TWO_L2H") {
        // console.log(event.target.dataset.filtertype);
        let rest = [...filteredRestaurants];
        rest.sort(
          (a, b) =>
            getNumberFromString(a.info.costForTwo) -
            getNumberFromString(b.info.costForTwo)
        );
        setFilteredRestaurants(rest);
      } else if (event.target.dataset.filtertype === "COST_FOR_TWO_H2L") {
        // console.log(event.target.dataset.filtertype);
        let rest = [...filteredRestaurants];
        rest.sort(
          (a, b) =>
            getNumberFromString(b.info.costForTwo) -
            getNumberFromString(a.info.costForTwo)
        );
        setFilteredRestaurants(rest);
      }
    }
  }


  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <h1 className="m-10 flex justify-center text-center text-3xl font-bold font-sans">
        🛑Offline!!Check Your Internet!
      </h1>
    );
  }

  //early return
  if (!allRestaurants || allRestaurants.length === 0) {
    return <BodyShimmer />;
  }
  return (
    <>
      <div className="w-[80vw] flex flex-col justify-center">
        <div className="bg-slate-50 flex flex-col items-center justify-center ">
          <div className="banner-section relative h-[30rem] flex  items-center w-full">
            <img
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
              className="h-full w-full absolute object-cover text-opacity-95 "
              alt="food background image"
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
            <div className="filterHeader lg:px-12 md:px-4 border-b-2 flex justify-between  my-8 ">
              <span className="text-[26px] font-semibold  text-gray-800 whitespace-nowrap">
                {totalRestaurants} restaurants
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

export default Body;
