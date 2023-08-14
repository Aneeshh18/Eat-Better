import React, { useState } from "react";
import logo from "../Images/logo.png";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Logo = () => (
  <a href="/">
    <img
      data-testid="logo"
      className="w-24 p-2 rounded-full"
      src={logo}
      alt="logo"
    />
  </a>
);

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="shadow-lg flex justify-between items-center relative px-4 py-3 md:px-8 lg:px-6">
      <div className="flex items-center">
        <Logo />
      </div>
      <div>
        <ul className="flex list-none space-x-4 md:space-x-8 font-poppins">
          <li className="p-2 md:p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 md:p-3">
            <Link to="/about">About US</Link>
          </li>
          <li className="p-2 md:p-3">
            <Link to="/help">Help</Link>
          </li>
          <li className="p-2 md:p-3">
            <Link to="/cart" className="flex gap-1 items-center">
              <BsCart4 className="inline text-2xl text-black opacity-75" />
              <span className="text-black p-[1px]">
                {cartItems ? (
                  <div data-testid="cart">{cartItems.length}</div>
                ) : (
                  ""
                )}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
