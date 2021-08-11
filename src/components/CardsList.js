import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PostsContext from "../context/PostsContext";
import CardWrap from "./CardWrap";


function CardsList() {
  const { posts, savePosts } = useContext(PostsContext);

  useEffect(() => {

    let initList = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_CARDS_URL);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const resultList = await response.json();
        savePosts(resultList);
      } catch (e) {
        console.error(e);
      }
    };
    initList();
    return;
  }, []);


  return (
    <div style={{margin:"20px"}}>
      <div className="wrapperMessage">
        <div className="newPost">
          <nav>
            <Link to="/posts/new">
              <button
                className="btn btn-success"
                style={{
                  maxHeight: "50px",
                  minWidth: "100px",
                  margin: "5px",
                  fontSize: "0.9rem",
                }}
              >
                Создать пост
              </button>
            </Link>
          </nav>
        </div>
      </div>
      {posts
        ? posts.map((post) => <CardWrap key={post.id} {...post} />)
        : null}
    </div>
  );
}

export default CardsList;
