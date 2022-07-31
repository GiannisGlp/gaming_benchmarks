import React, { memo } from "react";
import classes from "./Bars.module.css";

const Bars = ({ title, subTitle, orange = false, barsTitles, data }) => {
  const orangebarsStyle = (elem, triangle = false) => {
    let orangeStyle;
    let triangleOrange;

    if (data < 5000 && data > 0 && elem === "Casual") {
      triangleOrange = classes.triangleOrange;
      orangeStyle = classes.barsOrange;
    }
    if (data < 6900 && data > 5000 && elem === "Specialist") {
      triangleOrange = classes.triangleOrange;
      orangeStyle = classes.barsOrange;
    }
    if (data < 8850 && data > 6900 && elem === "Hardcore") {
      triangleOrange = classes.triangleOrange;
      orangeStyle = classes.barsOrange;
    } else if (data > 8850 && elem === "elite") {
      triangleOrange = classes.triangleOrange;
      orangeStyle = classes.barsOrange;
    }

    if (triangle) {
      return triangleOrange;
    } else {
      return orangeStyle;
    }
  };

  const subToDisplay = () => {
    if (!orange) {
      if (data === "Basic") {
        return barsTitles.firstLine[0].sub;
      }
      if (data === "Home") {
        return barsTitles.firstLine[1].sub;
      }
      if (data === "Produce") {
        return barsTitles.firstLine[0].sub;
      }
      if (data === "Create") {
        return barsTitles.firstLine[0].sub;
      } else {
        return [];
      }
    } else {
      if (data < 5000 && data > 0) {
        return barsTitles.firstLine[0].sub;
      }
      if (data < 6900 && data > 5000) {
        return barsTitles.firstLine[1].sub;
      }
      if (data < 8850 && data > 6900) {
        return barsTitles.firstLine[0].sub;
      }
      if (data > 8850) {
        return barsTitles.firstLine[0].sub;
      } else {
        return [];
      }
    }
  };

  const barTextColor = (title, index) => {
    if (orange) {
    } else {
      return title === data
        ? [classes.barsTitle, classes.whiteColor].join(" ")
        : classes.barsTitle;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>
          {title}
          <span className={classes.rSymbol}>&reg;</span>
          {!orange && (
            <span className={[classes.title, classes.pcTen].join(" ")}>10</span>
          )}
        </h2>
        <p className={classes.subTitle}>
          {subTitle} {orange ? data : null}
        </p>
      </div>

      <div className={classes.barsWithTriangle}>
        <div className={classes.barsWrapper}>
          {barsTitles.firstLine.map((elem, index) => {
            return (
              <div
                key={elem.title}
                className={[
                  classes.bars,
                  classes[`bar${index + 1}`],
                  !orange
                    ? elem.title === data
                      ? classes.barsRed
                      : null
                    : orangebarsStyle(elem.title),
                  ,
                ].join(" ")}
              >
                <p className={classes.barsTitle}>
                  {elem.title}
                  <br />
                  {barsTitles.secondLine ? barsTitles.secondLine[index] : null}
                </p>
                <div
                  className={[
                    classes.triangle,
                    orange
                      ? orangebarsStyle(elem.title, true)
                      : elem.title === data && classes.triangleRed,
                  ].join(" ")}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.barsFooter}>
        <p className={classes.barsFooterTitle}>{subToDisplay()}</p>
      </div>
    </div>
  );
};

export default memo(Bars);
