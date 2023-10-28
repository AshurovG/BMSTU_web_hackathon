import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import cn from "classnames";
import MainPage from "pages/MainPage";

import rootStore from "../store/RootStore/instance";
import classNames from "classnames";
import useLocalStorage from "use-local-storage";

// import DetaliedPage from 'pages/DetaliedPage';

function App() {
  return (
    <div className={cn(styles.app)}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
