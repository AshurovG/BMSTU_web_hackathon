import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import cn from "classnames";
import MainPage from "pages/MainPage";
import SatellitePage from "pages/SatellitePage";

function App() {
  return (
    <div className={cn(styles.app)}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/satellite" element={<SatellitePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
