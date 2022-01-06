import React, { useEffect, useState } from "react";

import { getSinglePost } from "../../actions/posts";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";
import { FetchImage } from "random-image-unsplash";

const SinglePostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, post, isLoading } = useSelector((state) => state.posts);
  const [randomImage, setrandomImage] = useState(null);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  console.log("posts loading: ", isLoading);

  FetchImage({ type: "wallpaper", width: 1200, height: 800 }).then((image) =>
    setrandomImage(image)
  );

  if (isLoading) {
    return (
      <div className="post-loading loading-container">
        <h5>loading the post...</h5>
        <LinearProgress />
      </div>
    );
  }

  if (!post) {
    // navigate("/post-not-found");
    return "nothing here";
  } else {
    const image =
      post.selectedFile || randomImage || "https://source.unsplash.com/random";

    return (
      <div className="single-post">
        <section>
          <div className="header">
            {/* <img src={post.selectedFile} alt={"Image for " + post.title} /> */}

            <h4>post by </h4>
            <h3>{post.authorName}</h3>
          </div>
        </section>

        <section>
          <h3
            style={{
              backgroundImage: `url(${image})`,
            }}
            className="title-img"
          >
            <div className="overlay"></div>
            <p className="post-title">{post.title}</p>
          </h3>
        </section>

        <section>
          <div className="body">
            <div className="info">
              <div className="time">
                <span>
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                  }).format(new Date(post.createdAt))}
                </span>
                <span> {moment(post.createdAt).fromNow()}</span>
              </div>
              <div className="tags">
                {post.tags.map((tag, tag_id) => (
                  <span key={tag_id} className="tag">
                    {`#${tag}`}
                  </span>
                ))}
              </div>
            </div>
            <p className="text"> {post.message}</p>
          </div>
        </section>
      </div>
    );
  }
};

export default SinglePostDetail;
