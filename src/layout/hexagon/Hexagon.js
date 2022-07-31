import React, { useEffect, useRef, useState } from "react";
import classes from "./Hexagon.module.css";

const Hexagon = ({ noBorder = false, sub, fps }) => {
  const [state, setState] = useState(null);
  const ref = useRef(0);

  const hexagonStyle = noBorder
    ? classes.hexagon
    : [classes.hexagon, classes.hexagonBorders, classes.withBorders].join(" ");

  const face1Style = noBorder
    ? classes.face1
    : [classes.face1, classes.withBorders].join(" ");

  const face2Style = noBorder
    ? classes.face2
    : [classes.face2, classes.withBorders].join(" ");

  const fpsTitleStyle = noBorder
    ? classes.fpsTitleLarge
    : classes.fpsTitleSmall;

  const fpsCounterStyle = noBorder
    ? classes.fpsCounterLarge
    : classes.fpsCounterSmall;

  const fpsSubsStyle = noBorder
    ? classes.fpsSub
    : [classes.fpsSub, classes.fpsSubMargin].join(" ");

  useEffect(() => {
    let isMounted = true;
    const updateCounterState = () => {
      if (ref.current < fps) {
        const result = Math.ceil(ref.current + 2);
        if (result > fps) return setState(fps);
        setState(result);
        ref.current = result;
      }

      setTimeout(updateCounterState, 20);
    };
    if (isMounted) {
      updateCounterState();
    }
    return () => {
      isMounted = false;
      ref.current = 0;
    };
  }, [fps]);

  return (
    <div className={classes.hexagonContent}>
      <div className={hexagonStyle}>
        <p className={fpsCounterStyle}>{fps === 0 ? fps : state + "+"}</p>
        <p className={fpsTitleStyle}>FPS</p>

        <div className={face1Style}></div>
        <div className={face2Style}></div>
      </div>
      <p className={fpsSubsStyle}>{sub}</p>
    </div>
  );
};

export default Hexagon;
