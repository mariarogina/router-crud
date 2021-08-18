import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import PropTypes from 'prop-types'; 



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
  id:PropTypes.number,
  content:PropTypes.string,
  created:PropTypes.number,
 
};

CardWrap.defaultProps = {
  id:'',
  content:'',
  created:'',
 
};
