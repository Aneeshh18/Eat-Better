import { useState } from "react";
import logo from "../Images/lgo2.jpg"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"; 

const Logo = () => (
    <a href="/">
        <img  data-testid = "logo"
        className="w-24 p-2"
        src={logo}
        alt="logo" />
    </a>
);

 const Header = () => {

    const [isLoggedin, setIsLoggedin] = useState(true);

    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between items-center shadow-md z-10">
            <div className="flex items-center">
              <Logo />
            </div>
            <div>
                <ul className="flex list-none pr-14 font-poppins">
                    <li className="p-3 mr-10">
                      <Link to= "/">Home</Link>
                    </li>
                    <li className="p-3 mr-10"> 
                      <Link to="/about">About US</Link>
                    </li>
                    <li className="p-3 mr-10">
                      <Link to="/help">Help</Link>
                    </li>
                    <li className="pt-3 p-3 mr-10" data-testid="cart" >
                      <Link to="/Cart">
                        Cart- {cartItems.length}items </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;