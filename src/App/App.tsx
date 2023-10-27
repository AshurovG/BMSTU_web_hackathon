import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import MainPage from "pages/MainPage";
import AuthForm from "pages/AuthForm";
import rootStore from "store/RootStore";
// import rootStore from 'store/RootStore/instance';
// import DetaliedPage from 'pages/DetaliedPage';

function App() {
  return (
    <div className="app">
      
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {!rootStore.userAuth.isLogin && <Route path='/auth' element={<AuthForm />}/>}
          <Route path='*' element={<Navigate to="/" replace />} />

          {/* <Route path="/subscription">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
