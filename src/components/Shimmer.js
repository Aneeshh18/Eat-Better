const Shimmer = () => {
  return (
    <> 
      {/* <div className="search shadow-md mt-20 ml-3.5 my-28 w-96 h-20 "></div> */}
      <div className="flex mt-28 flex-wrap" data-testid="shimmer">
        {Array(18)
          .fill([])
          .map((e, index) => (
            <div key={index} className="shadow-lg m-3 p-3 w-72 h-72">
              <div className="w-full h-1/2 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
              <div className="w-[90%] h-[10%] mt-3 border rounded-sm bg-64 custom-linear-gradient animate-shimmer "></div>
              <div className="w-[70%] h-[7%]  mt-3 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
              <div className="w-[70%] h-[7%]  mt-3 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
