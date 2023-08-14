import React, {
  lazy,
  Suspense,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Error from "./Error";
import Help from "./Help";
import RestuarantMenu from "./RestaurantMenu";
import Profile from "./Profile";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import Success from "./Success.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../utils/Store";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <div
        className={`m-auto w-[80vw] min-w-[80vw] min-h-screen flex flex-col box-border border`}
      >
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/About",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
        children: [
          {
            //Nested Routing
            path: "Profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "Help",
        element: <Help />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestuarantMenu />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success/:orderId",
        element: <Success />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
