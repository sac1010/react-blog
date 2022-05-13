import React from "react";
import "./cat.css";

export const Cat = ({ category }) => {
  const bgc = {
    fashion: "rgb(220, 144, 144)",
    technology: "bisque",
    food: "cyan",
    travel: "aquamarine",
    sports: "grey",
    movie: "orange",
  };

  return (
    <div className="cat" style={{ backgroundColor: bgc[category] }}>
      <h5>{category}</h5>
    </div>
  );
};
