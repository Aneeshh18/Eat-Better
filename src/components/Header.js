import { useState } from "react";
import logo from "../Images/lgo2.jpg";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Logo = () => (
  <a href="/">
    <img
      data-testid="logo"
      className=" w-24 p-2 rounded-full"
      src={logo}
      alt="logo"
    />
  </a>
);

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="shadow-lg flex justify-between items-center relative ">
      <div className="flex items-center">
        <Logo />
      </div>
      <div>
        <ul className="flex list-none pr-14 font-poppins">
          <li className="p-3 mr-10">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 mr-10">
            <Link to="/about">About US</Link>
          </li>
          <li className="p-3 mr-10">
            <Link to="/help">Help</Link>
          </li>
          <li className="pt-3 px-3 mr-10">
            <Link to="/cart" className="flex gap-1 items-center">
              <BsCart4 className="inline text-2xl text-black opacity-75" />
              <span className=" text-black p-[1px]">
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
