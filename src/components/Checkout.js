import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddressContext from "../utils/AddressContext";
import Cart from "./Cart";
import { TbDiscount2 } from "react-icons/tb";
import StripeCheckout from "react-stripe-checkout";
import { clearCart } from "../utils/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState("");

  const getTotal = () => {
    const total = cartItems.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0.0
    );
    return total;
  };

  const tokenReceiver = (token) => {
    dispatch(clearCart());
    navigate(`/success/${token?.created}`);
  };

  return (
    <div className="checkout-container">
      {cartItems.length ? (
        <div className="flex w-full font-poppins h-full border overflow-x-auto">
          <div className="left flex-grow flex-auto w-[50%] min-w-[50%] flex flex-col ml-16 mt-8">
            <div className="flex gap-8 flex-col bg-white p-10 rounded-lg shadow-md mb-8">
              <p className="font-bold text-lg">Choose payment method</p>
              <p className="text-slate-400">
                For dummy payment enter card number as 4242 4242 4242 4242
              </p>
              <StripeCheckout
                name="Payment Details"
                ComponentClass="div"
                panelLabel="Pay"
                amount={getTotal() + 6000 + 6095}
                currency="INR"
                token={tokenReceiver}
                stripeKey="pk_test_51NefsPSH3QNBV7nyrQ9kgxWu5RS351f2R96uZNhoaiVYHFdtqoCh6lAUreHXCYOUAWqVEOjr9tiAaABOC04PmGLW00pesdfhts"
              />
            </div>
          </div>
          <div className="right flex flex-col max-h-[100vh] w-fit box-border bg-white m-8 py-4 px-6 rounded-lg shadow-md">
            <div className="overflow-y-auto max-h-[calc(100vh-270px)]">
              <Cart />
              <div className="flex flex-col gap-5 max-w-[582px] min-w-[460px] px-5">
                {/* Suggestions input */}
                <input
                  className="bg-slate-100 w-full focus:outline-none p-4 text-sm rounded-lg"
                  placeholder="Any suggestions? We will pass it on..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // Handle the suggestion here
                      const enteredSuggestion = suggestion;
                      console.log(
                        "User entered suggestion:",
                        enteredSuggestion
                      );

                      // Clear the input and show UI behavior
                      setSuggestion("");
                      alert("Your suggestion has been recorded.");
                    }
                  }}
                />

                {/* No-contact Delivery option */}
                <div className="border flex text-sm gap-4 p-2 rounded-lg">
                  <input type="checkbox" className="mx-4" />
                  <div>
                    <span className="font-bold block">
                      Opt in for No-contact Delivery
                    </span>
                    <span className="text-xs text-slate-500">
                      Unwell, or avoiding contact? Please select no-contact
                      delivery. Partner will safely place the order outside your
                      door (not for COD)
                    </span>
                  </div>
                </div>

                {/* Apply Coupon button */}
                <button className="border-2 flex items-center border-dashed text-sm p-4 gap-5 rounded-lg">
                  <TbDiscount2 className="text-xl" />
                  <span>Apply Coupon</span>
                </button>

                {/* Bill Details */}
                <div className="text-xs">
                  <span className="block font-bold mb-3 border-b py-4">
                    Bill Details
                  </span>
                  {/* Item Total */}
                  <div className="flex justify-between mb-1">
                    <span>Item Total</span>
                    <span>&#8377; {(getTotal() + 0.0) / 100}</span>
                  </div>

                  {/* Delivery partner fee */}
                  <div className="flex justify-between mb-1 border-b py-4">
                    <span>Delivery partner fee</span>
                    <span>&#8377; 62</span>
                  </div>

                  {/* Govt Taxes & Other Charges */}
                  <div className="flex justify-between mb-1 py-4">
                    <span>Govt Taxes & Other Charges</span>
                    <span>&#8377; 60.95</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total to Pay */}
            <div className="flex justify-between mb-1 py-4 font-bold border-t-4 border-black">
              <span>TO PAY</span>
              <span>&#8377; {(getTotal() + 0.0) / 100 + 60 + 60.95}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-container">
          {/* ... (Content for empty cart) */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
