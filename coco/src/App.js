import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Route path='/auth/kakao/callback' component={Kakao} /> */}
      <Outlet />
    </>
  );
}

export default App;
