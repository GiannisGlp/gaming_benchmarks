import React from "react";
import classes from "./Line.module.css";

const Line = ({ red = false }) => {
  const lineStyle = red ? classes.lineRed : classes.line;
  return <div className={lineStyle}></div>;
};

export default Line;
