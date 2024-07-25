import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import MyNavbar from './Pages/Navebar/MyNavbar';
import Notfond from './Pages/Notfond';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Feedback from './Pages/Feedback';
import Home from '././Pages/Home'
import View from './Pages/View';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserLogged } from './Slice/UserLogin';

function App() {
  const dispatch = useDispatch();
  const {userLogged } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (!userLogged) {
      if (localStorage.getItem("user_Id")) {
        dispatch(setUserLogged(true));
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/register" element = {<Register/>} ></Route>
          <Route path="/" element = {<Login/>} ></Route>
          
          {userLogged ? 
          <>
          <Route path='/view' element ={<View/>}></Route>
          <Route path='/navbar' element = {<MyNavbar/>}></Route>
          <Route path='/notfound' element ={<Notfond/>}></Route>
          <Route path='/about' element ={<About/>}></Route>
          <Route path='/contact' element ={<Contact/>}></Route>
          <Route path='/home' element ={<Home/>}></Route>
          <Route path='/feedback' element ={<Feedback/>}></Route>
          
          </>
          :
          null
          }
      </Routes>
   </BrowserRouter>
  );
}

export default App;
