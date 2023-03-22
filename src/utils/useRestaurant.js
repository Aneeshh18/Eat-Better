// import { useState, useEffect } from "react";
// import {
//     swiggy_menu_api_url, 
//     IMG_CDN_URL, 
//     ITEM_IMG_CDN_URL,
//     MENU_ITEM_TYPE_KEY,
//     RESTAURANT_TYPE_KEY,
// } from "../config";

// const useRestaurant = (resId) => {
//     const [restaurant, setRestaurant] = useState(null);
//     const [menuItems, setMenuItems] = useState([]);

    
//     useEffect(() => {
//         getRestarurantInfo();
//     }, []);

//     async function getRestarurantInfo() {
//         const data = await fetch(
//          swiggy_menu_api_url + resId
//         );
//         const json = await data.json(); 
//         setRestaurant(json?.data?.cards?.map(x => x.card)?.
//         find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null);
//     }

//     return restaurant;
// };

// export default useRestaurant;
