import React, { useState } from "react";

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
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <div>Кнопка</div>
      <Button>Привет</Button>
      <div>Карточка</div>
      <Card title={"ssss"} image={svg} actionSlot={<Button>Save</Button>} />
      <div>Чекбокс</div>
      <CheckBox checked={checked} onChange={() => setChecked(!checked)} />
      <div>Инпут</div>
      <Input value={text} onChange={setText} />
      <div>Loader</div>
      <Loader />
      <div>Switch</div>
      <ThemeSwitcher isChecked={isDark} onChange={() => setIsDark(!isDark)} />
    </div>
  );
};

export default MainPage;
