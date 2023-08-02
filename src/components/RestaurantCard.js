import { IMG_CDN_URL } from "../config";

// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  sla,
  costForTwo,
  avgRating,
}) => {
  return (
    <div className="flex flex-col overflow-hidden m-3 p-3 w-60  rounded-sm hover:shadow-xl duration-300 font-poppins bg-white shadow-sm">
      <img
        loading="lazy"
        className="w-full border rounded-sm "
        src={IMG_CDN_URL + cloudinaryImageId}
        alt="image of a dish from the restaurant"
      />
      <span className="block font-bold text-lg mt-3 ">
        {name?.length > 20 ? name.slice(0, 20) + "..." : name}
      </span>
      <span className="mt-3 text-gray-600 text-xs">{cuisines.join(", ")}</span>
      <div className="mt-3 mb-3 flex items-center justify-between">
        <span
          className="w-12 text-center border rounded-md text-white text-xs mr-2"
          style={
            avgRating >= 4
              ? { backgroundColor: "#48c479" }
              : avgRating >= 3
              ? { backgroundColor: "#DB7C38" }
              : avgRating === "--"
              ? { backgroundColor: "#48c479" }
              : { backgroundColor: "#E31837" }
          }
        >
        {avgRating} &#9733;
      </span>
        <span className="text-sm" >{costForTwo}</span>
        <span className="text-sm" >{sla?.deliveryTime}min</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
