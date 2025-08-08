import {Navigate, Route, Routes} from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js"; 
import PageLoader from "./components/PageLoader.jsx";


const App = () => {
  //tanStack Query
  const {data:authData, isLoading } = useQuery({
    queryKey: ["authUser"],

    queryFn : async () =>{
      const res = await axiosInstance.get("/auth/me"); //base url : http://localhost:5001/api
      // const data = await res.json();
      return res.data;
    },
    retry:false, // make retry req false
  })

  const authUser = authData?.user
  if(isLoading) return <PageLoader/>
    // console.log(data);
  return (
    <div className='h-screen' data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />}/>
        <Route path="/notifications" element={authUser ? <NotificationPage/> : <Navigate to="/login"/>}/>
        <Route path="/call" element={authUser ? <CallPage/> : <Navigate to="/login"/>}/>
        <Route path="/chat" element={authUser ? <ChatPage/> : <Navigate to="/login"/>}/>
        <Route path="/onboarding" element={authUser ? <OnboardingPage/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
