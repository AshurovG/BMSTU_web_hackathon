import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import MainPage from "pages/MainPage";
import AuthForm from "pages/AuthForm";
// import DetaliedPage from 'pages/DetaliedPage';

function App() {
  return (
    <div className="app">
      
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/auth' element={<AuthForm />}></Route>
          <Route path='*' element={<Navigate to="/" replace />} />

          {/* <Route path="/subscription">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route> */}
        </Routes>


        {/* <Routes>
                    <Route path='/' element={<RecipesPage />} />

                    <Route path='/recipe'>
                        <Route path=':id' element={<RecipesDetailedPage />} />
                    </Route>

                    <Route path='/mealplan' element={<MealPlanPage />}/>
                    
                    <Route path='/restaurants' element={<RestaurantsPage/>}/>

                    <Route path='/auth' element={<AuthForm />}></Route>

                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes> */}
      </HashRouter>
    </div>
  );
}

export default App;
