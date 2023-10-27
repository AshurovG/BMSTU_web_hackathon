import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "components/Header";
import ProfileWindow from "components/ProfileWindow";
import ModalWindow from "components/ModalWindow";
// import Button from "components/Button";
// import AuthForm from "components/AuthForm";
// import LockingScreen from "components/LockingScreen";
import styles from "./MainPage.module.scss";
import cn from "classnames";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Loader from "components/Loader";
// import ModalWindow from "components/ModalWindow";
import Slider from "components/Slider";

import ThemeSwitcher from "components/ThemeSwitcher";
import useLocalStorage from "use-local-storage";
import userSvg from "assets/icons/sun.png";
import rootStore from "store/RootStore";
import MultiDropdown from "components/DropDown";

const MainPage = () => {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={cn(styles.main__page, {
        [styles.dark]: rootStore.theme.isDark,
      })}
    >
      <Header></Header>

      <div className={styles["main__page-wrapper"]}>
        <Card
          captionSlot="sssss"
          subtitle="ssesesese"
          image={userSvg}
          title="sss"
          actionSlot={<Button>kakaka</Button>}
        ></Card>
        <div>--------------------</div>
        <Input
          placeholder="aaa"
          value={input}
          onChange={(str) => setInput(str)}
        />
        <CheckBox checked={checked} onChange={() => setChecked(!checked)} />
        {/* <MultiDropdown
          className={styles.selection__block}
          options={recipesStore.options}
          value={recipesStore.dropdownValue}
          onChange={recipesStore.handleDropdownChange}
          getTitle={recipesStore.getDropdownTitle}
        /> */}
      </div>
    </div>
  );
};

export default MainPage;
