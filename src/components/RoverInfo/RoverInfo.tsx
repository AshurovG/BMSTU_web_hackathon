import * as React from "react";

import { observer } from "mobx-react-lite";

import cn from "classnames";
import styles from "./RoverInfo.module.scss";
import Button from "components/Button";
import Input from "components/Input";
import ProfileLogoIcon from "components/icons/ProfileLogoIcon";
import { Link } from "react-router-dom";
import rootStore from "store/RootStore";


const ProfileWindow: React.FC = () => {
  const [value, setValue] = React.useState('')
  return (
    <div className={styles.info}>
      <div className={styles.info__wrapper}>
        <div className={styles.info__content}>
          <h3>Название: {rootStore.satellite.rover.name}</h3>
          <h3>
            Координаты: x: {rootStore.satellite.rover.x} y:{" "}
            {rootStore.satellite.rover.y}
          </h3>
          <h3>Глубина погружения: 33%</h3>
          <h3>Угол поворота: {rootStore.satellite.rover.angle} градусов</h3>

          <h3>Заряд: {rootStore.satellite.rover.charge}%</h3>
        </div>

        <div className={styles.info__actions}>
          <Button className={styles.info__actions_button}>
            Включить освещение
          </Button>
          <Button className={styles.info__actions_button}>Анализ почвы</Button>
          <Button className={styles.info__actions_button}>
            Собрать материал
          </Button>
          <Input placeholder="Процент погружения/всплытия" value={value} onChange={setValue}></Input>
          <div className={styles['info__actions-btns']}>
            <Button onClick={() => rootStore.satellite.setImmersion({uuid: rootStore.satellite.rover.uuid, move: 'down', depth: Number(value)})} className={styles['info__actions-btn']}>Погрузить</Button>
            <Button onClick={() => rootStore.satellite.setImmersion({uuid: rootStore.satellite.rover.uuid, move: 'up', depth: Number(value)})} className={styles['info__actions-btn']}>Поднять</Button>
          </div>
        </div>

        <div className={styles.info__manage}>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'up'})}>W</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'down'})}>S</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'left'})}>A</Button>
          <Button onClick={() => rootStore.satellite.setMove({uuid: rootStore.satellite.rover.uuid, move: 'right'})}>D</Button>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfileWindow);
