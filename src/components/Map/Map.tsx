import React from "react";
import styles from "./Map.module.scss";
import rootStore from "store/RootStore";
import { observer } from "mobx-react-lite";
import MapChart from "components/HightMap";

// interface Map {
//   x: number;
//   y: number;
// }

// interface MapProps {
//   point: Map;
// }

const Map = () => {
  const mapWidth = 100; // Ширина карты в метрах
  const mapHeight = 100; // Высота карты в метрах

  const pointX = (rootStore.satellite.rover.x / mapWidth) * 100; // Преобразование координаты X в проценты
  const pointY = (rootStore.satellite.rover.y / mapHeight) * 100; // Преобразование координаты Y в проценты

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const targetElement = event.target as HTMLElement;
    const clickX = Math.floor((offsetX / targetElement.offsetWidth) * mapWidth);
    const clickY = Math.floor(
      (offsetY / targetElement.offsetHeight) * mapHeight
    );

    const deltaX = clickX - pointX;
    const deltaY = clickY - pointY;

    // Фрмирование массива операций
    let commands = [];
    if (deltaX > 0) {
      for (let i = 0; i < deltaX; i++) {
        commands.push("right");
      }
    } else {
      for (let i = 0; i < Math.abs(deltaX); i++) {
        commands.push("left");
      }
    }

    if (deltaY > 0) {
      for (let i = 0; i < deltaY; i++) {
        commands.push("up");
      }
    } else {
      for (let i = 0; i < Math.abs(deltaY); i++) {
        commands.push("down");
      }
    }

    for (let command of commands) {
      rootStore.satellite.setMove({
        uuid: rootStore.satellite.rover.uuid,
        move: command,
      });
    }

    // console.log(commands);
    console.log(deltaX, deltaY);
  };

  return (
    <div className={styles.map} onClick={handleClick}>
      {/* <MapChart /> */}
      <div
        className={styles.rover}
        style={{
          top: `${pointY}%`,
          left: `${pointX}%`,
        }}
      ></div>
    </div>
  );
};

export default observer(Map);
