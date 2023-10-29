import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const animateRef = useRef<number>(0);

  useEffect(() => {
    if (ref.current) {
      // Создание сцены и камеры Three.js
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // Создание рендерера Three.js
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (ref.current.firstChild) {
        ref.current.replaceChild(renderer.domElement, ref.current.firstChild);
      } else {
        ref.current.appendChild(renderer.domElement);
      }

      // Создание геометрии и материала для параллелепипеда
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      // Добавление параллелепипеда на сцену
      scene.add(cube);

      // Позиционирование камеры
      camera.position.z = 5;

      // Функция анимации
      const animate = function () {
        animateRef.current = requestAnimationFrame(animate);

        // Вращение параллелепипеда
        cube.rotation.x = 0.5;
        cube.rotation.y = 0.5;

        renderer.render(scene, camera);
      };

      animate();
    }

    // Очистка анимационного кадра на выгрузке компонента
    return () => cancelAnimationFrame(animateRef.current);
  }, []);

  // Подписка на события resize и обновление размеров рендерера и камеры при ресайзинге окна
  useEffect(() => {
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);
      camera.position.z = 5;

      if (ref.current) {
        if (ref.current.firstChild) {
          ref.current.replaceChild(renderer.domElement, ref.current.firstChild);
        } else {
          ref.current.appendChild(renderer.domElement);
        }
      }
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return <div style={{ width: "100px" }} ref={ref}></div>;
};

export default ThreeDBox;
