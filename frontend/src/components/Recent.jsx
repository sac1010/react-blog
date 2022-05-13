import React from "react";
import { Link } from "react-router-dom";
import { Cat } from "./Cat";
import "./recent.css";

export const Recent = ({ imgUrl, title, date, category, _id }) => {
  return (
    <Link to={`/blog/${_id}`}>
      <div className="recent">
        <img className="rec-img" src={imgUrl} alt="" />
        <div>
          <h3>{title}</h3>
          <p>{date}</p>
          <Cat category={category}></Cat>
        </div>
      </div>
    </Link>
  );
};
