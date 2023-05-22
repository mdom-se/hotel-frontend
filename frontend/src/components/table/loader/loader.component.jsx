import React from "react";
import loader from "./../assets/spinner.gif";

const Loader = () => {
  return (
    <div >
      <img className="loader" src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
