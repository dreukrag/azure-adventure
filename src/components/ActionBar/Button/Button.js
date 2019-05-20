import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = props => {
  const { type, text, description, onClickFunc, disabled } = props;
  const [show, setShow] = useState(false);
  const showTrue = () => {
    setShow(true);
  };
  const showFalse = () => {
    setShow(false);
  };
  const getClass = () => {
    if (disabled) return styles.disabled;
    else return "";
  };

  const showDescription = () => {
    if (show) return styles.show;
    else return styles.hide;
  };

  return (
    <button
      onClick={onClickFunc}
      className={[styles.main, getClass()].join(" ")}
      //show
      onMouseEnter={showTrue}
      onMouseOver={showTrue}
      onTouchStart={showTrue}
      //hide
      onMouseLeave={showFalse}
      onMouseOut={showFalse}
      onTouchEnd={showFalse}
    >
      <div className={[styles.descriptionBox, showDescription()].join(" ")}>
        <p className={styles.description}>{description}</p>
      </div>
      <p className={styles.text}>{text}</p>
    </button>
  );
};

Button.defaultProps = {
  type: "func",
  text: "Button",
  description: "This is a button",
  onClickFunc: () => console.log("default function"),
  disabled: true
};
Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  onClickFunc: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
