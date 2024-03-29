export function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  return filterData;
}

export function getNumberFromString(cost) {
  // get integer from string cost of two

  //       To get integer value from string, use this code const str = '₹200 for two';
  //       const int = str.match(/\d+/g)
  //       console.log(+int) // 200

  let int = cost.match(/\d+/g);

  return +int;
}
