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
import Home from './Pages/Home/Home';
import Purchase from './Pages/UserModules/Purchase/Purchase';
import MyOrders from './Pages/UserModules/MyOrders/MyOrders';
import MyReview from './Pages/UserModules/MyReview/MyReview';
import RequireAuth from './Pages/Auth/RequireAuth';
import Payment from './Pages/UserModules/Payment/Payment';

function App() {



  return (
    <div >

      <Header></Header>
      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/item/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>

        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<WelcomePage></WelcomePage>}></Route>
          <Route path='addproduct' element={<AddProduct></AddProduct>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='myoders' element={<MyOrders></MyOrders>}></Route>
          <Route path='myreview' element={<MyReview></MyReview>}></Route>


        </Route>
        <Route path='signup' element={<Register></Register>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
