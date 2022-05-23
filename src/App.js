import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Home/Register/Register';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/MyProfile/MyProfile';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import AddProduct from './Pages/Dashboard/AddProduct/AddProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <div >

      <Header></Header>
      <Routes>
        <Route path='signup' element={<Register></Register>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='dashboard' element={<Dashboard></Dashboard>}>
          <Route index element={<WelcomePage></WelcomePage>}></Route>
          <Route path='addproduct' element={<AddProduct></AddProduct>}></Route>


        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
