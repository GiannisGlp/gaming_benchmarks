import React, { useEffect, useState } from "react";
import Dropdown from "../../../layout/dropdown/Dropdown";
import Data from "../../../data/dixons_benchmark.json";
import Hexagon from "../../../layout/hexagon/Hexagon";
import Line from "../../../layout/line/Line";
import Bars from "../../../layout/bars/Bars";
import classes from "./Body.module.css";

const CHOOSE_LAPTOP_TITLE =
  "Διάλεξε το laptop που σε ενδιαφερει και ανακάλυψε τις επιδόσεις του";
const CHOOSE_GAME_TITLE =
  "Διάλεξε το παιχνίδι που σε ενδιαφερει και ανακάλυψε τις επιδόσεις του";

const RED_BARS_TITLE = {
  firstLine: [
    {
      title: "Basic",
      sub: "Καλύπτει τους κοινούς, καθημερινούς τρόπους με τους οποίους οι άνθρωποι χρησιμοποιούν έναν υπολογιστή. Στους φόρτους εργασίας περιλαμβάνονται η περιήγηση στο Web, η τηλεδιάσκεψη και ο χρόνος εκκίνησης της εφαρμογής.",
    },
    {
      title: "Home",
      sub: "Η ομάδα δοκιμής παραγωγικότητας μετρά την απόδοση του συστήματος με καθημερινές εφαρμογές γραφείου. Αυτή η ομάδα δοκιμής περιλαμβάνει τους φόρτους εργασίας υπολογιστικών φύλλων και γραφής.",
    },
    {
      title: "Produce",
      sub: "Ο φόρτος εργασίας αυτής της ομάδας δοκιμής αντικατοπτρίζει τις απαιτήσεις της εργασίας με ψηφιακό περιεχόμενο και μέσα. Οι δοκιμές περιλαμβάνουν Επεξεργασία Φωτογραφίας, Επεξεργασία βίντεο και Απόδοση και Οπτικοποίηση.",
    },
    {
      title: "Create",
      sub: "Αποκτήσε ισχυρές δυναττότητες επεξεργασίας φωτογραφιών, βίντεο & μουσικής ή/ και διασκεδάστε παίζοντας απαιτητικά παιχνίδια. Οδανικό PC για βαριές εργασίες & δημιουργία περιεχομένου.",
    },
  ],
};
const ORANGE_BARS_TITLE = {
  firstLine: [
    {
      title: "Casual",
      sub: "Level 1 - (Casual) Είναι ένα φανταστικό αρχικό σύστημα επομένως δεν θα σας προσφέρει εξαιρετικά υψηλούς ρυθμούς καρέ ή τις καλύτερες ρυθμίσεις λεπτομέρειας, αλλά πολλά παλαιότερα παιχνίδια και τίτλοι Esports μπορούν να παίξουν τέλεια.",
    },
    {
      title: "Specialist",
      sub: "Level 2 - (Specialist) Παρεχέται απρόσκοπτη λειτουργία σε όλα τα παιχνιδια σε ανάλθση 1080p με hight graphics ρυθμίσεις. Ό τα προϊόντα από Level 2 και άνω είναι VR-ready.",
    },
    {
      title: "Hardcore",
      sub: "Level 3 - (Hardcore) Παρεχέται απρόσκοπτη λειτουργία σε όλα τα παιχνιδια σε ανάλθση 1440p για αυτά τα πιο όμορφα παιχνίδια και υψηλότερους ρυθμούς καρέ σε Esports και indie παιχνίδια.",
    },
    {
      title: "Elite",
      sub: "Level 4 - (Elite) Παρεχέται απρόσκοπτη λειτουργία σε όλα τα παιχνιδια σε ανάλθση 4k UHD για αυτά τα πιο όμορφα παιχνίδια και υψηλότερους ρυθμούς καρέ σε Esports και indie παιχνίδια.",
    },
  ],
  secondLine: ["< 5000", "< 6900", "< 8850", "> 8850"],
};

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
