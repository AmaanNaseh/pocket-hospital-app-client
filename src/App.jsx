
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientProfile from './PatientProfile';
import DoctorProfile from './DoctorProfile';
import BookAppointment from './BookAppointment';

function App() {
  const history=useNavigate();
  const [accessToken,setAccessToken]=useState('');
  const getToken=(token,redirect)=>{
    setAccessToken(token);
    console.log(redirect)
    if(['/profile/patient','/profile/doctor'].indexOf(redirect)>-1){
      history(redirect)
    }
  }

  // useEffect(()=>{
  //   console.log(accessToken)
  // },[accessToken])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login getToken={getToken}/>}/>
        <Route path='/signup' element={<Signup getToken={getToken}/>}/>
        <Route path='/profile/patient' element={<PatientProfile accessToken={accessToken}/>}></Route>
        <Route path='/profile/doctor' element={<DoctorProfile accessToken={accessToken}/>}></Route>
        <Route path='/bookappointment' element={<BookAppointment accessToken={accessToken}/>}></Route>
      </Routes>
    </>
  )
}

export default App
