import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PostsContext from "../context/PostsContext";
import CardView from "./CardView";
import PropTypes from 'prop-types'; 


function EditCard(props) {
  const { content, id } = props;
  const [newContent, setNewContent] = useState(content);
  const [goToCardView, setGoToCardView] = useState(false);
  const history = useHistory();

  const { savePosts } = useContext(PostsContext);
  const updateContext = async () => {
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

  const savePost = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CARDS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, content: newContent }),
      });
      if (!response.ok) {
        throw new Error("Remove failed");
      } else {
        updateContext();
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      setGoToCardView(true);
    }
  };

  const cancel = () => {
    history.goBack();
  };

  const changeValue = (e) => {
    setNewContent(e.target.value);
  };

  if (!goToCardView) {
    return (
      <div className="wrapperMessage padding">
        <div style={{ textAlign: "right" }}>
          <b
            className="btn btn-warning"
            style={{
              maxHeight: "50px",
              minWidth: "100px",
              fontSize: "0.9rem",
            }}
            onClick={cancel}
          >
            X
          </b>
        </div>
        <b className="padding">Редактировать публикации</b>
        <div id="editCard" className="padding">
          <div>
            <img src="../images/logo.jpg" alt="" />
          </div>
          <textarea value={newContent} onChange={changeValue}></textarea>
        </div>
        <table className="actions">
          <tbody>
            <tr className="padding">
              <td className="padding">Фото/видео</td>
              <td className="padding">Отметить друзей</td>
            </tr>
            <tr className="padding">
              <td className="padding">Чувства/действия</td>
              <td className="padding">Отметить посещение</td>
            </tr>
            <tr className="padding">
              <td className="padding">GIF</td>
            </tr>
          </tbody>
        </table>
        <div className="right">
          <button
            className="btn btn-success"
            style={{
              maxHeight: "50px",
              minWidth: "100px",
              margin: "5px",
              fontSize: "0.9rem",
            }}
            onClick={savePost}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  } else {
    return <CardView />;
  }
}

export default EditCard;

EditCard.propTypes = {
  post: PropTypes.func,
 
};

EditCard.defaultProps = {
  post: ()=>{},
 
};