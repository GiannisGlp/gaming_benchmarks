import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.cicleWrapper}>
          <div className={classes.cicle}>
            <h2 className={classes.letterU}>U</h2>
            <h2 className={classes.letterL}>L</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
