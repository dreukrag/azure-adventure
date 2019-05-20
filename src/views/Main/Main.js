import React from "react";
import styles from "./Main.module.scss";
import LeftBar from "components/LeftBar/LeftBar";
import RightBar from "components/RightBar/RightBar";
import TextScreen from "components/TextScreen/TextScreen";
import { Grid } from "@material-ui/core";
import ActionBar from "components/ActionBar/ActionBar";

export default class Main extends React.Component {
  render = () => {
    return (
      <Grid container className={styles.mainGrid}>
        <LeftBar />
        <Grid item xs={7}>
          <TextScreen />
          <ActionBar />
        </Grid>
        <RightBar />
      </Grid>
    );
  };
}
