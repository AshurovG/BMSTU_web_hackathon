import * as React from "react";

import { observer } from "mobx-react-lite";

import cn from "classnames";
import styles from "./RoverInfo.module.scss";
import Button from "components/Button";
import Input from "components/Input";
import ProfileLogoIcon from "components/icons/ProfileLogoIcon";
import { Link } from "react-router-dom";
import rootStore from "store/RootStore";
import Slider from "components/Slider";

const ProfileWindow: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [sliderValues, setSliderValues] = React.useState(1);

  const handleSliderChange = (value: number) => {
    setSliderValues(value);
    console.log(value)
  };

  const handleButtonClick = () => {
    const deltaZ = sliderValues - rootStore.satellite.rover.z 
    console.log('deltaZ', deltaZ)

    rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, x: 0, y: 0 , z: deltaZ})
  }

  

  return (
    <div className={styles.info}>
      <div className={styles.info__wrapper}>
        <div className={styles.info__content}>
          <h3>Название: {rootStore.satellite.rover.name}</h3>
          <h3>
            Координаты: x: {rootStore.satellite.rover.x} y:{" "}
            {rootStore.satellite.rover.y}
          </h3>
          <h3>Глубина погружения: {rootStore.satellite.rover.z}%</h3>

          <h3>Заряд: {rootStore.satellite.rover.charge}%</h3>
          <h3>Температура: {rootStore.satellite.rover.temperature} градусов</h3>
        </div>

        <div className={styles.info__actions}>
          <Button className={styles.info__actions_button}>
            Включить освещение
          </Button>
          <Button className={styles.info__actions_button}>Анализ почвы</Button>
          <Button className={styles.info__actions_button}>
            Собрать материал
          </Button>
          {/* <Input placeholder="Процент погружения/всплытия" value={value} onChange={setValue}></Input> */}
          <Slider
              onChangeValues={handleSliderChange}
              minimum={1}
              maximum={99}
              title="На сколько погрузить / поднять?"
            />
          <div className={styles['info__actions-btns']}>
            <Button onClick={handleButtonClick} className={styles['info__actions-btn']}>Погрузить</Button>
            <Button className={styles['info__actions-btn']} onClick={handleButtonClick}>Поднять</Button>
          </div>
        </div>

        {/* <div className={styles.info__manage}>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'up'})}>W</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'down'})}>S</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'left'})}>A</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'right'})}>D</Button>
        </div> */}
      </div>
    </div>
  );
};

export default observer(ProfileWindow);
