import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import Header from "components/Header";
import ProfileWindow from "components/ProfileWindow";
// import Button from "components/Button";
// import AuthForm from "components/AuthForm";
// import LockingScreen from "components/LockingScreen";
import styles from './MainPage.module.scss'

import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Loader from "components/Loader";
import ModalWindow from "components/ModalWindow";
import Slider from "components/Slider";

import svg from "../../assets/react.svg";

import ThemeSwitcher from "components/ThemeSwitcher";
import useLocalStorage from "use-local-storage";

const MainPage = () => {
  const [value, setValue] = useState(false)

  return (
    <div className={styles.main__page}>
      <Header></Header>
      <div className={styles['main__page-wrapper']}>
      <Button onClick={() => setValue(!value)}>show</Button>
      <AnimatePresence>
      {value && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <ProfileWindow
          username="asurov13"
          fullname="Ашуров Георгий Витальевич"
          onClick={() => console.log(111111)}
          />
        </motion.div>)}
      </AnimatePresence>
      </div>
      
    </div>
  );
};

export default MainPage;
