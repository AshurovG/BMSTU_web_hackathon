import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
// import Button from "components/Button";
// import AuthForm from "components/AuthForm";
// import LockingScreen from "components/LockingScreen";

import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Loader from "components/Loader";
import ModalWindow from "components/ModalWindow";
import Slider from "components/Slider";

import ThemeSwitcher from "components/ThemeSwitcher";
import useLocalStorage from "use-local-storage";
import userSvg from "assets/icons/sun.png";

const MainPage = () => {
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <>
      <Header></Header>
      <ThemeSwitcher isChecked={isDark} onChange={() => setIsDark(!isDark)} />
      <Card
        captionSlot="sssss"
        subtitle="ssesesese"
        image={userSvg}
        title="sss"
      ></Card>
    </>
  );
};

export default MainPage;
