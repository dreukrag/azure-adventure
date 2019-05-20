import React from "react";
import styles from "./ActionBar.module.scss";
import Button from "./Button/Button";

const ActionBar = props => {
  return (
    <div className={styles.main}>
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
    </div>
  );
};

export default ActionBar;
