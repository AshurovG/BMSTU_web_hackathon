import React from "react";
import styles from "./Map.module.scss";

interface Map {
  x: number;
  y: number;
}

interface MapProps {
  point: Map;
}

const Map: React.FC<MapProps> = ({ point }) => {
  const mapWidth = 100; // Ширина карты в метрах
  const mapHeight = 100; // Высота карты в метрах

  const pointX = (point.x / mapWidth) * 100; // Преобразование координаты X в проценты
  const pointY = (point.y / mapHeight) * 100; // Преобразование координаты Y в проценты

  return (
    <div className={styles.map}>
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

export default Map;
