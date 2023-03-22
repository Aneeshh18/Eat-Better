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
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../utils/Store";



const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
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
        element: <Help/>,
      },
      {
        path: "/restaurant/:resId",
        element: <RestuarantMenu />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
