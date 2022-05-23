import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Home/Register/Register';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/MyProfile/MyProfile';
import WelcomePage from './Pages/WelcomePage/WelcomePage';


function App() {



  return (
    <div >

      <Header></Header>
      <Routes>
        <Route path='signup' element={<Register></Register>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='dashboard' element={<Dashboard></Dashboard>}>
          <Route index element={<WelcomePage></WelcomePage>}></Route>


        </Route>
      </Routes>

    </div>
  );
}

export default App;
