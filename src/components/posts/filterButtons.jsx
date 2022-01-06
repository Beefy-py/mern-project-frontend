import React from "react";
import { useDispatch } from "react-redux";
import { filterOldest } from "../../actions/posts";
import { filterMostLiked } from "./../../actions/posts";

const FilterButtons = () => {
  const dispatch = useDispatch();

  return (
    <aside className="filter-btns">
      <button>Latest</button>
      <button onClick={() => dispatch(filterOldest())}>Oldest</button>
      <button onClick={() => dispatch(filterMostLiked())}>Most Liked</button>
      <button>Most Disliked</button>

      <button>Tags</button>
    </aside>
  );
};

export default FilterButtons;
