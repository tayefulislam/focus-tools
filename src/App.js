import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Home/Register/Register';
import Login from './Pages/Login/Login';


function App() {



  return (
    <div >

      <Header></Header>
      <Routes>
        <Route path='signup' element={<Register></Register>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
      </Routes>

    </div>
  );
}

export default App;
