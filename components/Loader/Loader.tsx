import React from "react";
import "./Loader.css";

interface LoaderProps {
  w?: number;
  h?: number;
};

const Loader = ({w,h}:LoaderProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
