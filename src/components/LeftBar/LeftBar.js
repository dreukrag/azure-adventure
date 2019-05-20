import React from "react";
import styles from "./LeftBar.module.scss";
import Grid from "@material-ui/core/Grid";

const LeftBar = props => {
  return (
    <Grid item xs={2} className={styles.main}>
      <div>GridLeft</div>
    </Grid>
  );
};
export default LeftBar;
