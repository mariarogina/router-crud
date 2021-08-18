import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "./Card";
import PostsContext from "../context/PostsContext";
import CardsList from "./CardsList";
import EditCard from "./EditCard";
import PropTypes from 'prop-types'; 

function CardView(props) {
  const history = useHistory();
  const params = useParams();
  const { posts } = useContext(PostsContext);
  const currentPost = posts.find((post) => post.id === Number(params.postId));
  const [isEditPost, setIsEditPost] = useState(false);

  console.log("Card View Props" + props)

  const editPost = () => {
    setIsEditPost(true);
  };

  const cancel = () => {
    history.push("/");
  };

  const removePost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CARDS_URL}/${currentPost.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Remove failed");
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      history.push("/");
    }
  };

  if (currentPost) {
    if (!isEditPost) {
      return (
        <div className="wrapperMessage padding cardInList">
          <Card {...currentPost} />
          <div style={{margin:"10px"}}>
            <button className="btn btn-primary"  style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }} onClick={editPost}>
              Изменить
            </button>
            <button className="btn btn-danger"  style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }} onClick={removePost}>
              Удалить
            </button>
            <b
              className="btn btn-warning"
              style={{
                maxHeight: "50px",
                margin: "10px",
                fontSize: "0.9rem",
              }}
              onClick={cancel}
            >
              back
            </b>
          </div>
        </div>
      );
    } else {
      return <EditCard {...currentPost} />;
    }
  } else {
    return <CardsList />;
  }
}

export default CardView;

CardView.propTypes = {
  id:PropTypes.number,
  content:PropTypes.string,
  created:PropTypes.number,
 
};

CardView.defaultProps = {
  id:'',
  content:'',
  created:'',
 
};