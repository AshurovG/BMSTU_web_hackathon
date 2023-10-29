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

  return (
    <div className={styles.map}>
      <MapChart />
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
