import React, { useState } from "react";
import PropTypes from 'prop-types'; 


function NewCard(props) {
  const { history } = props;
  const [inputValue, setInputValue] = useState();

  console.log({...history})

  const changeValue = (evt) => {
    const { value } = evt.target;
    setInputValue(value);
  };

  console.log("New Card Props" + props)

  const savePost = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CARDS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 0, content: inputValue }),
      });
      if (!response.ok) {
        throw new Error("Save failed");
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      history.push("/");
    }
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="wrapperMessage">
      <div style={{textAlign:"right"}}>
        <b
          onClick={cancel}
          className="btn btn-warning"
          style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }}
        >
          X
        </b>
      </div>
      <div>
        <textarea
          placeholder="Введите текст..."
          value={inputValue}
          onChange={changeValue}
        ></textarea>
      </div>
      <div className="newPost">
        <button className="btn btn-success"  
          style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }} onClick={savePost}>
          Опубликовать
        </button>
      </div>
    </div>
  );
}

export default NewCard;

NewCard.propTypes = {
  post: PropTypes.func,
 
};

NewCard.defaultProps = {
  post: ()=>{},
 
};
