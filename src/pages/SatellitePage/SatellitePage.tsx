import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "components/Header";
import ProfileWindow from "components/ProfileWindow";
import ModalWindow from "components/ModalWindow";
import RoverInfo from "components/RoverInfo";
import { observer } from "mobx-react-lite";
import Slider from "components/Slider";
// import Button from "components/Button";
// import AuthForm from "components/AuthForm";
// import LockingScreen from "components/LockingScreen";
import styles from "./SatellitePage.module.scss";
import cn from "classnames";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Loader from "components/Loader";
// import ModalWindow from "components/ModalWindow";
// import Slider from "components/Slider";

import ThemeSwitcher from "components/ThemeSwitcher";
import useLocalStorage from "use-local-storage";
import userSvg from "assets/icons/sun.png";
import rootStore from "store/RootStore";
import MultiDropdown from "components/DropDown";
import Map from "components/Map";

import Canvas from "components/Canvas";

// const point = { x: 95, y: 95 };

const SatellitePage = () => {
  const [sliderValues, setSliderValues] = useState([1, 99]);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
  };


  return (
    <div
      className={cn(styles.sat__page, {
        [styles.dark]: rootStore.theme.isDark,
      })}
    >
      <Header></Header>
      <div className={styles.sat__page_wrapper}>
        <div className={styles.sat__page_rover}>
          <Map />

          <div className={styles.profile__view}></div>

          <RoverInfo />
        </div>
      </div>
    </div>
  );
};

export default observer(SatellitePage);
