import React from "react";
import styles from "./Map.module.scss";
import rootStore from "store/RootStore";
import { observer } from "mobx-react-lite";
import MapChart from "components/HightMap";
import * as d3 from "d3";

// interface Map {
//   x: number;
//   y: number;
// }

// interface MapProps {
//   point: Map;
// }

type Data = {
  x: number;
  y: number;
  z: number;
};

const data: Data[] = [];

for (let x = 0; x <= 100; x++) {
  for (let y = 0; y <= 100; y++) {
    const z = Math.floor(Math.random() * 3) * 10; // 0, 10, or 20
    data.push({ x, y, z });
  }
}



const Map = () => {
  const ref = React.useRef<SVGSVGElement | null>(null);

  const mapWidth = 100; // Ширина карты в метрах
  const mapHeight = 100; // Высота карты в метрах

  const pointX = (rootStore.satellite.rover.x / mapWidth) * 100; // Преобразование координаты X в проценты
  const pointY = (rootStore.satellite.rover.y / mapHeight) * 100; // Преобразование координаты Y в проценты

  React.useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 650;
    const height = 500;

    const color = d3
      .scaleSequential()
      .domain([0, d3.max(data, (d) => d.z) || 0])
      .interpolator(d3.interpolateHsl("lightblue", "darkblue"));

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const group = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x(d.x)}, ${y(d.y)})`);

    group
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => color(d.z));
  }, []);

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();

    const scaleX = mapWidth / rect.width;
    const scaleY = mapHeight / rect.height;
  
    const clickX = Math.ceil((clientX - rect.left) * scaleX);
    const clickY = Math.ceil((clientY - rect.top) * scaleY);

    const deltaX = Number(clickX) - pointX;
    const deltaY = Number(clickY) - pointY;

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

    rootStore.satellite.setMove({
      uuid: rootStore.satellite.rover.uuid,
      x: deltaX,
      y: deltaY,
      z: 0
    });

    console.log({
      uuid: rootStore.satellite.rover.uuid,
      x: deltaX,
      y: deltaY,
      z: 0
    });
  };

  // return 

  return (
    <div className={styles.map}>
      <svg onClick={handleClick} className={styles.map} ref={ref} width={650} height={500} />;
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
