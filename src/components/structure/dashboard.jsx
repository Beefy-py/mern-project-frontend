import React from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  const isLoading = useSelector((state) => state.posts.isLoading);

  const userPosts = useSelector((state) =>
    state.posts.posts.filter(
      (post) => post.authorId === currentUser?.result?._id
    )
  );

  // const userComments = useSelector((state) =>
  //   state.comments.filter((com) => com.author === currentUser?.result?.name)
  // );

  const mostLiked = userPosts.sort(
    (a, b) => b.likes.length - a.likes.length
  )[0];

  const totalLikes = userPosts.reduce((a, b) => a + b.likes.length, 0);
  const totalDislikes = userPosts.reduce((a, b) => a + b.dislikes.length, 0);

  const getPosterScore = () => {
    console.log(totalLikes, totalDislikes, userPosts.length);
    const result =
      totalLikes / userPosts.length + (totalDislikes / userPosts.length) * 10;
    console.log(result, Math.round(result, 2));
    if (!result || result === NaN || result === Infinity) return "0";
    return Math.round(result, 2);
  };

  if (isLoading) {
    return (
      <div className="user-page-loading loading-container">
        <h5>loading your data...</h5>
        <LinearProgress />
      </div>
    );
  }

  return (
    <section className="dashboard">
      <div className="user-info">
        <h3>{currentUser?.result?.name}</h3>
        <p className="date-joined">
          <b>Date Joined: </b>
          <span>
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(currentUser?.result?.date_joined))}
          </span>
        </p>

        <p className="poster-score">
          <b>Poster Score: </b> <span>{getPosterScore()}</span>
        </p>
      </div>
      <aside className="comments">
        <h3>
          Your Comments
          <span>{0}</span>
        </h3>
        {/* {userComments.length ? (
          <div className="data">
            {userComments.map((com, index) => (
              <div key={index}>{com.body}</div>
            ))}
          </div>
        ) : (
          <h4>You haven't commented on any post.</h4>
        )} */}
      </aside>
      <aside className="posts">
        <h3>
          Your posts
          <span>{userPosts.length}</span>
        </h3>
        {userPosts.length ? (
          <div className="data">
            {userPosts.map((post, index) => (
              <div key={index}>{post.title}</div>
            ))}
          </div>
        ) : (
          <h4>You haven't posted anything.</h4>
        )}
      </aside>
      <aside className="stats">
        <h3>Total Reactions</h3>

        <div>
          <span>Likes:</span>
          <span className="pos">
            {totalLikes} <i className="fas fa-thumbs-up"></i>
          </span>
        </div>
        <div>
          <span> Dislikes:</span>
          <span className="neg">
            {totalDislikes} <i className="fas fa-thumbs-down"></i>
          </span>
        </div>
        <div>
          <span> CommentLikes:</span>
          <span className="pos">
            {0} <i className="fas fa-thumbs-up"></i>
          </span>
        </div>
        <div>
          <span> CommentDisLikes:</span>
          <span className="neg">
            {0} <i className="fas fa-thumbs-down"></i>
          </span>
        </div>
      </aside>
    </section>
  );
};

export default Dashboard;
