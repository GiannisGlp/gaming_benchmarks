import React, { useEffect, useState } from "react";
import Dropdown from "../../../layout/dropdown/Dropdown";
import Data from "../../../data/dixons_benchmark.json";
import Hexagon from "../../../layout/hexagon/Hexagon";
import Line from "../../../layout/line/Line";
import Bars from "../../../layout/bars/Bars";
import {
  CHOOSE_GAME_TITLE,
  CHOOSE_LAPTOP_TITLE,
  RED_BARS_TITLE,
  ORANGE_BARS_TITLE,
} from "../../../data/Data";
import classes from "./Body.module.css";

const Body = () => {
  const [openGames, setOpenGames] = useState(false);
  const [openLaptops, setOpenLaptops] = useState(false);
  const [laptopSelectTitle, setLaptopSelectTitle] = useState("Laptop");
  const [gameSelectTitle, setGameSelectTitle] = useState("Game");
  const [selectLaptopIndex, setSelectLaptopIndex] = useState(-1);
  const [selectGameIndex, setSelectGameIndex] = useState(-1);
  const [fpsCounter, setFpsCounter] = useState({ normal: 0, ultra: 0 });
  const [mark, setMark] = useState({ pcMark: "", threeDMark: "" });

  const games = Data[0].Games;
  const gamesKeys = Object.keys(games);
  const laptopTitles = Data.map((laptop) => laptop.sku);

  const selectLaptopIndexHandler = (index) => {
    setSelectLaptopIndex(index);
  };
  const selectGameIndexHandler = (index) => {
    setSelectGameIndex(index);
  };

  useEffect(() => {
    if (selectLaptopIndex > -1) {
      setLaptopSelectTitle(laptopTitles[selectLaptopIndex]);
      setGameSelectTitle(Object.keys(games)[selectGameIndex]);
    } else {
      setLaptopSelectTitle("Laptop");
      setGameSelectTitle("Game");
    }
    if (selectGameIndex > -1) {
      setGameSelectTitle(Object.keys(games)[selectGameIndex]);
    } else {
      setGameSelectTitle("Game");
    }
  }, [selectLaptopIndex, selectGameIndex]);

  useEffect(() => {
    setGameSelectTitle("Game");
  }, [selectLaptopIndex]);

  useEffect(() => {
    if (selectGameIndex > -1 && selectLaptopIndex > -1) {
      let normalUltraFps =
        Data[selectLaptopIndex].Games[gamesKeys[selectGameIndex]];

      setMark({
        pcMark: Data[selectLaptopIndex].PCMark_Category,
        threeDMark: Data[selectLaptopIndex]["3DMark_Time_Spy_score"],
      });
      setFpsCounter({
        normal:
          normalUltraFps.normal !== "Not enough VRAM"
            ? +normalUltraFps.normal
            : 0,
        ultra:
          normalUltraFps.ultra !== "Not enough VRAM"
            ? +normalUltraFps.ultra
            : 0,
      });
    } else {
      if (gameSelectTitle === "Game") {
        setFpsCounter({ normal: 0, ultra: 0 });
      }
    }
  }, [selectGameIndex, selectLaptopIndex]);

  return (
    <div className={classes.container}>
      <div className={classes.dropdown}>
        <Dropdown
          title={true}
          chooseTitle={CHOOSE_LAPTOP_TITLE}
          selectTitle={laptopSelectTitle}
          selectIndex={selectLaptopIndexHandler}
          selectedIndex={selectLaptopIndex}
          optionTitles={laptopTitles}
          isOpen={openLaptops}
          setOpen={() => {
            setOpenGames(false);
            setOpenLaptops((open) => !open);
          }}
          buttonBackDisabled={laptopSelectTitle === "Laptop"}
          buttonForwardDisabled={laptopTitles.length - 1 === selectLaptopIndex}
        />
        <Dropdown
          top="24.4rem"
          chooseTitle={CHOOSE_GAME_TITLE}
          selectTitle={gameSelectTitle}
          selectedIndex={selectGameIndex}
          selectIndex={selectGameIndexHandler}
          optionTitles={laptopSelectTitle === "Laptop" ? [] : gamesKeys}
          isOpen={openGames}
          setOpen={() => {
            setOpenLaptops(false);
            setOpenGames((open) => !open);
          }}
          buttonBackDisabled={selectGameIndex <= 0}
          buttonForwardDisabled={
            laptopSelectTitle === "Laptop" ||
            gamesKeys.length - 1 === selectGameIndex
          }
        />
      </div>
      <div className={classes.hexagonFillWrapper}>
        <Hexagon noBorder sub="NORMAL 1080p" fps={fpsCounter.normal} />
        <Hexagon noBorder sub="ULTRA 1440P" fps={fpsCounter.ultra} />
      </div>
      <Line />
      <div className={classes.hexagonBorderWrapper}>
        <div className={classes.fpsTitleWrapper}>
          <p className={classes.fpsScore}>FPS Score</p>
        </div>
        <div className={classes.hexagonFillWrapper}>
          <Hexagon sub="ZERO HACKING" fps={60} />
          <Hexagon sub="RECOMMENDED" fps={100} />
        </div>
      </div>
      <Line red />
      <div className={classes.barsWrapper}>
        <Bars
          title="PCMARK"
          barsTitles={RED_BARS_TITLE}
          subTitle="Το προϊον αυτό είναι κατάλληλο για:"
          data={mark.pcMark}
        />
        <Bars
          title="3DMARK"
          barsTitles={ORANGE_BARS_TITLE}
          subTitle={`Time Spy:`}
          data={+mark.threeDMark}
          orange
        />
      </div>
    </div>
  );
};

export default Body;
