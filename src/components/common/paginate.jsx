import React, { useEffect } from "react";

import Pagination from "react-bootstrap/Pagination";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page, display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { numberOfPages, currentPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  const handlePageChange = (p) => {
    navigate(`?page=${p}`);
  };

  const displayItems = () => {
    return _.range(1, numberOfPages + 1).map((pageNum) => {
      const item = (
        <Pagination.Item
          key={pageNum}
          active={Boolean(pageNum === Number(page))}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      );

      return item;
    });
  };

  if (!display) return "";

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handlePageChange(Number(page) - 1)}
        disabled={page === "1"}
      />

      {displayItems()}
      <Pagination.Ellipsis></Pagination.Ellipsis>

      <Pagination.Next
        disabled={Boolean(currentPage === numberOfPages)}
        onClick={() => handlePageChange(Number(page) + 1)}
      />
    </Pagination>
  );
};

export default Paginate;
