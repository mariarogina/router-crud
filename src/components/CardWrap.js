import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";



function CardWrap (props) {
  const history = useHistory();

  const openPost = () => {
    history.push(`/posts/${props.id}`);
  };

  

  return (
    <div className="wrapperMessage padding cardInList" onClick={openPost}>
      <Card {...props} />
      <div className="commentBlock">
        <img className="inline" src="../images/logo.png" alt="" />
        <input className="inline" value="Напишите комментарий..." readOnly />
      </div>
    </div>
  );
}

export default CardWrap;

CardWrap.propTypes = {
  post: PropTypes.func,
 
};

CardWrap.defaultProps = {
  post: ()=>{},
 
};
