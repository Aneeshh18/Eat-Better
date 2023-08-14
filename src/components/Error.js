import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  const errorStyle = {
    textAlign: "center",
    margin: "auto",
    paddingTop: "20vh",
  };

  const headingStyle = {
    fontSize: "2rem",
    marginBottom: "1rem",
  };

  const statusStyle = {
    fontSize: "1.5rem",
    color: "red",
  };

  return (
    <div style={errorStyle}>
      <h1 style={headingStyle}>Oops!</h1>
      <h2 style={headingStyle}>Something went wrong!</h2>
      <h2 style={statusStyle}>
        {err.status}: {err.statusText}
      </h2>
    </div>
  );
};

export default Error;
