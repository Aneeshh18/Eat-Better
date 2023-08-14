const BodyShimmer = () => {
  return (
    <>
      <div className="w-[80vw] flex flex-col justify-center">
        <div className="bg-slate-50 flex flex-col items-center justify-center ">
          <div className="banner-section relative h-[30rem] flex items-center w-full animate-shimmer">
            <div className="hero shadow-lg m-3 p-3 w-full h-96 animate-shimmer"></div>
          </div>
          <div className="filterHeader lg:px-12 md:px-4 border-b-2 flex justify-between my-8 ">
            <span className="text-[26px] font-semibold text-gray-800 whitespace-nowrap animate-shimmer">
              Restaurants
            </span>
            <div className="filterList flex ml-96 gap-4 px-2 text-slate-600 whitespace-nowrap font-semibold animate-shimmer">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    className="hover:border-b border-black hover:text-black animate-shimmer"
                  >
                    Loading...
                  </button>
                ))}
            </div>
          </div>
          <div
            className="restaurant flex flex-wrap justify-center animate-shimmer"
            data-testid="shimmer-res-list"
          >
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="shadow-lg m-3 p-3 w-72 h-72 animate-shimmer"
                >
                  <div className="w-full h-1/2 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
                  <div
                    className="w-[90%] h-[10%] mt-3 border rounded-sm
                 bg-64 custom-linear-gradient animate-shimmer"
                  ></div>
                  <div className="w-[70%] h-[7%] mt-3 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
                  <div className="w-[70%] h-[7%] mt-3 border rounded-sm bg-64 custom-linear-gradient animate-shimmer"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyShimmer;
