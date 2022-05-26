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
import ManageUser from './Pages/Dashboard/ManageUser/ManageUser';
import ManageOrders from './Pages/Dashboard/ManageOrders/ManageOrders';
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts';
import RequireAdmin from './Pages/Auth/RequireAdmin';
import MyPortfolio from './Pages/MyPortfolio/MyPortfolio';
import NotFound from './Pages/Shared/Header/NotFound';

function App() {



  return (
    <div >

      <Header></Header>
      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/item/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>

        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<WelcomePage></WelcomePage>}></Route>

          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='myoders' element={<MyOrders></MyOrders>}></Route>
          <Route path='myreview' element={<MyReview></MyReview>}></Route>
          <Route path='myprofile' element={<MyProfile></MyProfile>}></Route>


          <Route path='addproduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='manageuser' element={<RequireAdmin><ManageUser></ManageUser></RequireAdmin>}></Route>
          <Route path='manageOrders' element={<RequireAdmin><ManageOrders></ManageOrders></RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>



        </Route>
        <Route path='myportfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='signup' element={<Register></Register>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
