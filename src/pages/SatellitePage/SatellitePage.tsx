import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "components/Header";
import ProfileWindow from "components/ProfileWindow";
import ModalWindow from "components/ModalWindow";
import RoverInfo from "components/RoverInfo";
import { observer } from "mobx-react-lite";
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
  // const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      rootStore.satellite.setIsError(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  const mapHDepth = 100; // Высота карты в метрах

  const pointZ = (90 / mapHDepth) * 100; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const pointY = (rootStore.satellite.rover.y / mapHeight) * 100; // Преобразование координаты Y в проценты

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

          <div className={styles.profile__view}>
            <div
              className={styles.rover}
              style={{
                top: `${pointZ}%`,
                // left: `${pointX}%`,
              }}
            ></div>
          </div>

          <RoverInfo />
          <ModalWindow
            active={rootStore.satellite.isError}
            handleBackdropClick={() => console.log("aaaa")}
            title="You have successfully logged in!"
            className={styles.form__modal}
          >
            <div className={styles.slot}>
              <div>Ошибка </div>
            </div>
          </ModalWindow>
        </div>
      </div>
    </div>
  );
};

export default observer(SatellitePage);
