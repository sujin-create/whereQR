import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Account/signin";
import Signup from "./components/Account/signup";
import QRScan from "./components/QRcode/scanner";
import Detail from "./components/QRcode/DetailQR";
import SaveQR from "./components/QRcode/saveQR";
import ModifyQR from "./components/QRcode/ModifyQR";
import Navbar from "./components/Navbar/index";
import Homepage from "./components/main";
import UserQr from "./components/QRcode/UserQr";

function App() {
  return (
          <BrowserRouter>
            <Navbar /> 
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Scan" element={<QRScan />} />
              <Route path="/Scan/:ID" element={<Detail />} />
              <Route path="/SaveQR/:ID" element={<SaveQR />} />
              <Route path="/UserQr" element={<UserQr />} />
              <Route path="/ModifyQR/:ID" element={<ModifyQR />} />
            </Routes>
      </BrowserRouter>
  );
}


export default App;
