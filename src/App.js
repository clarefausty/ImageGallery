
import React from 'react';
import Home from './Component/Home/Home'
import RegisterAndLogin from './Component/auth/RegisterAndLogin';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return(
    <BrowserRouter>
    <div>
    <Routes>
      <Route path='/' element={<RegisterAndLogin/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </div>
  </BrowserRouter>
  )
  
}

export default App;

