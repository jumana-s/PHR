import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useToken from './useToken';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Dashboard from './Dashboard';

export default function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      {!token && token !== "" && token !== undefined ?
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
            <Route path="/signup" element={<Signup token={token} setToken={setToken}/>} />
          </Routes>
        : (
          <Fragment>
          <Header token={removeToken}/>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Fragment>
        )}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
