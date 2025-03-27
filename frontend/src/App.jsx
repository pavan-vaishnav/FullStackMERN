import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom'
import Header from './assets/Header';
import Home from './assets/Home';
import Signup from './assets/Signup';
import Signin from './assets/Signin';
import Cart from './assets/Cart';
import Forgotpass from './assets/Forgotpass';
import Privateroute from './assets/Privateroute';
import Dashboard from './assets/user/Dashboard';
import Adminroute from './assets/Adminroute';
import Admindashboard from './assets/admin/Admindashboard';
import Createcategory from './assets/admin/Createcategory';
import Createproduct from './assets/admin/Createproduct';
import Users from './assets/admin/Users';
import Orders from './assets/user/Orders';
import Profile from './assets/user/Profile';
import Products from './assets/admin/Products';
import Updateproduct from './assets/admin/Updateproduct';
import Search from './assets/Search';
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/forgotpass' element={<Forgotpass/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/dashboard' element={<Privateroute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<Adminroute/>}>
        <Route path='admin' element={<Admindashboard/>}/>
        <Route path='admin/create-category' element={<Createcategory/>}/>
        <Route path='admin/create-product' element={<Createproduct/>}/>
        <Route path='admin/update-product/:slug' element={<Updateproduct/>}/>
        <Route path='admin/allproducts' element={<Products/>}/>
        <Route path='admin/users' element={<Users/>}/>
      </Route>
    </Routes>
      
    </>
  )
}

export default App
