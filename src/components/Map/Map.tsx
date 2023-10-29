import React from "react";
import styles from "./Map.module.scss";
import rootStore from "store/RootStore";
import { observer } from "mobx-react-lite";
import MapChart from "components/HightMap";
import * as d3 from "d3";
// import data from '../../terrain'

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

let data: Data[] = [];

const centers = [
  { x: 0, y: 100 },
  { x: 5, y: 70 },
  { x: 30, y: 60 },
  { x: 90, y: 50 },
  { x: 50, y: 0 },
  { x: 5, y: 5 },
  { x: 25, y: 25 },
  { x: 75, y: 25 },
  { x: 50, y: 75 },
  { x: 100, y: 100 },
  { x: 20, y: 47 },
  { x: 50, y: 50 },
  { x: 80, y: 80 },
  { x: 100, y: 100 },
  { x: 100, y: 0 },
];

for (let x = 0; x <= 100; x++) {
  for (let y = 0; y <= 100; y++) {
    let maxZ = 0;

    for (const center of centers) {
      const distanceToCenter = Math.sqrt(
        Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)
      );
      const z = Math.floor((1 - distanceToCenter / 25) * 100); // Adjusted divisor to make radii smaller
      if (z > maxZ) {
        maxZ = z;
      }
    }

    data.push({ x, y, z: maxZ });
  }
}

// data = rootStore.satellite.map;
console.log(data);

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
      .attr("r", 3)
      .attr("fill", (d) => color(d.z));
  }, []);

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (rootStore.satellite.rover.warning === 'moving') {
      return
    }
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
      z: 0,
    });

    console.log({
      uuid: rootStore.satellite.rover.uuid,
      x: deltaX,
      y: deltaY,
      z: 0,
    });
  };

  // return

  return (
    <div className={styles.map}>
      <svg
        onClick={handleClick}
        className={styles.map}
        ref={ref}
        width={650}
        height={500}
      />
      ;
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
