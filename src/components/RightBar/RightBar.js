import React from "react";
import styles from "./RightBar.module.scss";
import Grid from "@material-ui/core/Grid";

const RightBar = props => {
  return (
    <Grid item xs={3} className={styles.main}>
      <div>GridRight</div>
    </Grid>
  );
};

export default RightBar;
