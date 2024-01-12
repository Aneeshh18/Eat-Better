import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import Cart from "./Cart";

const EMPTY_CART_IMAGE_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((store) => store.cart);

  const handleClearCart = () => {s
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        {cartItems.length ? (
          <Cart />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-60 md:w-80"
              src={EMPTY_CART_IMAGE_URL}
              alt="Your cart is currently empty."
              loading="lazy"
            />

            <h2 className="text-2xl md:text-3xl font-semibold mt-4">
              Your Cart Is Empty
            </h2>

            <Link to="/">
              <button className="py-2 px-4 bg-slate-900 text-white rounded-sm shadow-md hover:bg-black mt-4">
                Explore Restaurants
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
