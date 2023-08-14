import React, { useState } from "react";
import food from "../Images/download.png";
import { Link, Outlet } from "react-router-dom";

const About = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-1/2 p-4 md:p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-green-800 mb-4">
            Welcome to The World of Tasty & Fresh Food.
          </h1>
        </div>

        <div className="max-w-md md:max-w-lg mx-auto mt-4 md:mt-8 flex justify-center">
          <img className="w-48 md:w-64 rounded-lg" src={food} alt="Food Image" />
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link to={show ? "/about" : "profile"}>
            <button
              className={`py-2 px-4 rounded-lg text-white ${
                show ? "bg-red-500" : "bg-green-800"
              } hover:bg-opacity-75 transition-all`}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"} My Profile
            </button>
          </Link>
          {show && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default About;
