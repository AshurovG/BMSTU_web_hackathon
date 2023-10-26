import React, { useState } from "react";

import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Loader from "components/Loader";
import ModalWindow from "components/ModalWindow";
import Slider from "components/Slider";

import svg from "../../assets/react.svg";

const MainPage = () => {
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");

  return (
    <>
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
    </>
  );
};

export default MainPage;
