import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
      <div className="flex">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mx-1"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mx-1"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mx-1"></div>
      </div>
    </div>
  );
};

export default Loading;
