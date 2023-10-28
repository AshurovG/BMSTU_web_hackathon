import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import cn from "classnames";
import MainPage from "pages/MainPage";
import SatellitePage from "pages/SatellitePage";

import rootStore from "../store/RootStore/instance";
import classNames from "classnames";
import useLocalStorage from "use-local-storage";

// import DetaliedPage from 'pages/DetaliedPage';

function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  return (
    <div className={cn(styles.app)}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/satellite" element={<SatellitePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* <Route path="/subscription">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
