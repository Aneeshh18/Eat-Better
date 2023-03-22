import { IMG_CDN_URL } from "../config";

// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  area,
  lastMileTravelString,
  costForTwoString,
  avgRating,
}) => {
  return (
    <div className="w-72 p-5 m-2 shadow-sm">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h2 className="font-bold text-xl">{name}</h2>
      <h5>{cuisines.join(", ")}</h5>
      <h6>{lastMileTravelString}</h6>
      {/* <span>
        <h4
          style={
            avgRating < 4 ? { backgroundColor: "red" } : { color: "white" }
          }
        >
          <i className="fa-solid fa-star"></i>
          {avgRating}
        </h4>
        <h4>{lastMileTravelString}</h4>
        <h4>{costForTwoString}</h4>
      </span> */}
    </div>
  );
};

export default RestaurantCard;