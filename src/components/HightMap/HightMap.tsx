import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import styles from "./HighMap.module.scss";

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

const MapChart = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 868;
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

  return <svg className={styles.map} ref={ref} width={868} height={500} />;
};

export default MapChart;
