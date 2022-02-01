import React, { useState, useRef, useEffect } from "react";
import AllPosts from "../posts/allPosts";
import Form from "../common/form";
import Paginate from "./../common/paginate";
import SearchIcon from "@mui/icons-material/Search";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, TextField } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MainContent = () => {
  const isLoading = useSelector((state) => state.posts.isLoading);
  const [formShow, setFormShow] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [chips, setChips] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const navigate = useNavigate();
  const query = useQuery();
  const currentPage = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const doSearch = () => {
    if (searchValue.trim() || chips.length) {
      console.log("searching...");
      dispatch(
        getPostsBySearch({ search: searchValue, tags: chips.join(",") })
      );
      navigate(
        `/posts/search?searchQuery=${searchValue || null}&tags=${chips.join(
          ","
        )}`
      );
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };

  const scrollToForm = () => {
    console.log("Scrolling to form");
    formRef.current.scrollIntoView();
  };

  const handleAdd = (inp) => {
    setChips([...chips, inp]);
  };

  const handleDelete = (inp) => {
    setChips((prevState) => prevState.filter((ch) => ch !== inp));
  };

  // console.table({
  //   loading: isLoading,
  //   searchText: Boolean(searchValue),
  //   searchTags: Boolean(chips.length),
  // });

  return (
    <main>
      <div className="search-fields">
        <TextField
          placeholder="Search by Title"
          id="search-title"
          variant="standard"
          value={searchValue}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <ChipInput
          value={chips}
          variant="standard"
          onAdd={handleAdd}
          onDelete={handleDelete}
          placeholder="Search by tag + Enter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TagIcon />
              </InputAdornment>
            ),
          }}
        />

        <button type="submit" onClick={doSearch}>
          Search Posts
        </button>
      </div>

      <Form
        currentId={currentId}
        formShow={formShow}
        setFormShow={setFormShow}
        formRef={formRef}
        setCurrentId={setCurrentId}
      />

      <AllPosts
        setCurrentId={setCurrentId}
        scrollToForm={scrollToForm}
        setFormShow={setFormShow}
      />

      <Paginate
        page={currentPage}
        display={Boolean(!isLoading && !searchValue && !chips.length)}
      />
    </main>
  );
};

export default MainContent;
