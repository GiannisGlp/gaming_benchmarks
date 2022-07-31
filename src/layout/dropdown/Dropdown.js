import React, { useState, useEffect, useCallback, memo } from "react";
import classes from "./Dropdown.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Dropdown = ({
  chooseTitle,
  title = false,
  top = "16.8rem",
  selectTitle,
  selectIndex,
  optionTitles,
  isOpen,
  setOpen,
  selectedIndex,
  buttonBackDisabled,
  buttonForwardDisabled,
}) => {
  const toggleDropdown = () => {
    if (optionTitles.length !== 0) {
      setOpen();
    }
  };

  const optionWrapperStyle = useCallback(() => {
    if (!isOpen) {
      return classes.optionWrapper;
    } else {
      return [classes.optionWrapper, classes.withHeight].join(" ");
    }
  }, [isOpen]);

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        {title && (
          <h3 className={classes.title}>Δες τις επιδόσεις του laptop</h3>
        )}

        <p className={classes.chooseTitle}>{chooseTitle}</p>
      </div>
      <div className={classes.dropdown}>
        <button
          disabled={buttonBackDisabled}
          className={classes.cicle}
          onClick={() => selectIndex(selectedIndex - 1)}
        >
          <ArrowBackIcon />
        </button>
        <div className={classes.selectContent} onClick={toggleDropdown}>
          <p className={classes.selectTitle}>{selectTitle}</p>
          <KeyboardArrowDownIcon />
        </div>
        <button
          disabled={buttonForwardDisabled}
          className={classes.cicle}
          onClick={() => selectIndex(selectedIndex + 1)}
        >
          <ArrowForwardIcon />
        </button>
      </div>

      <div className={optionWrapperStyle()} style={{ top }}>
        {optionTitles.map((elem, index) => {
          return (
            <div
              className={classes.contentWrapper}
              key={elem}
              onClick={() => {
                selectIndex(index);
                setOpen();
              }}
            >
              <p className={classes.optionContent}>{elem}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
