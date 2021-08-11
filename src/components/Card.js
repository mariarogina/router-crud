import React from "react";
import PropTypes from 'prop-types'; 
import moment from "moment";


function Card(props) {
  const { content, created } = props;
  console.log("Card Props" + props)

  const formatDateTime = (date) => {
    if (!date) {
      return null;
    }
    return moment(date).locale("ru").fromNow();
  };

  return (
    <>
      <div className="postHeader">
        <table className="cardBloc leftPadding">
          <tbody>
            <tr>
              <td>
                <img
                  className="cardBlock"
                  src="../images/logo.jpg"
                  alt=""
                  style={{ margin: "10px", width: "80px" }}
                />
              </td>
              <td
                className="userName"
                style={{ fontSize: "0.7rem", margin: "10px", width: "110px" }}
              >
                User Name
              </td>

              <td style={{ width: "110px" }}>
                {formatDateTime(content && created)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="post-text">{content}</div>
      </div>
      <div className="reactionBlock padding">
        <p
          className="btn btn-outline-primary"
          style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }}
        >
          Нравится
        </p>
        <p
          className="btn btn-outline-primary"
          style={{
            maxHeight: "50px",
            minWidth: "100px",
            margin: "5px",
            fontSize: "0.9rem",
          }}
        >
          Комментировать
        </p>
      </div>
    </>
  );
}

export default Card;

Card.propTypes = {
  post: PropTypes.func,
 
};

Card.defaultProps = {
  post: ()=>{},
 
};

