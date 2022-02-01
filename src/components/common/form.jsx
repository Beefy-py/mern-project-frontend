import React, { useState, useEffect } from "react";
import InputField from "./inputField";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { loremIpsum, fullname, username } from "react-lorem-ipsum";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId, formShow, setFormShow, formRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
      setFormShow(true);
      setTags([...post.tags]);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.result?.name) {
      return <h1>Log in to create post.</h1>;
    }

    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          authorName: user?.result?.name,
          tags,
        })
      );
      navigate(`/posts/${currentId}`);
    } else {
      dispatch(
        createPost(
          {
            ...postData,
            authorName: user?.result?.name,
            tags,
          },
          navigate
        )
      );
    }

    cancel();
  };

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setPostData({ ...postData, [targetName]: targetValue });
  };

  const cancel = (e) => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });

    setTags([]);

    setCurrentId(null);

    setFormShow(false);
  };

  const makeDummyPost = () => {
    const randNum = Math.floor(Math.random() * 6);

    const shuffledTitle = (
      loremIpsum({
        avgSentencesPerParagraph: 1,
        avgWordsPerSentence: randNum,
        startWithLoremIpsum: true,
      }).join(" ") + username()
    )
      .match(/\w*/g)
      .reverse();

    const dummyPost = {
      title: shuffledTitle.join(" ").trim(),
      author: fullname({ gender: "all" }),
      message: loremIpsum({ p: randNum, avgSentencesPerParagraph: 5 }).join(
        "\r\n\n"
      ),
      tags: "lorem,test,dummy,post,dummy-text",
      selectedFile: "",
    };

    dispatch(createPost(dummyPost));
  };

  const handleAddTag = (e) => {
    const val = tagInput.trim();

    if (
      (e.code === "Space" || e.key === ",") &&
      val.length &&
      !tags.includes(val)
    ) {
      e.preventDefault();
      setTags([...tags, val]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (i) => {
    setTags((prevTags) => prevTags.filter((tag, index) => i !== index));
  };

  return user?.result ? (
    <React.Fragment>
      <button
        ref={formRef}
        className="btn form-toggle"
        onClick={() => setFormShow(!formShow)}
      >
        {currentId ? "Update" : "Create"} Post
        <i className={formShow ? "fas fa-angle-up" : "fas fa-angle-down"}></i>
      </button>

      <div
        className={formShow ? "form-container form-visible" : "form-container"}
      >
        <form action="" noValidate onSubmit={handleSubmit} ref={formRef}>
          <h4>{currentId ? "Editing" : "Creating"} a post...</h4>

          <InputField
            type="text"
            label="Title"
            value={postData.title}
            onChangeFunc={handleChange}
          />
          <InputField
            type="textfield"
            label="Message"
            value={postData.message}
            onChangeFunc={handleChange}
          />

          <div className="tags-field">
            {tags.map((tag, index) => (
              <div className="tag">
                {tag}
                <i
                  onClick={() => handleDeleteTag(index)}
                  className="fas fa-times"
                ></i>
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter tags: [comma/space]"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div className="input-field">
            <label htmlFor="selectedFile">Select File</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <div className="actions">
            <button type="submit">Submit</button>
            <button onClick={makeDummyPost} className="btn-dummy">
              CreateDummy <i className="fas fa-cog"></i>
            </button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default Form;
