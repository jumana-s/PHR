import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import useToken from "./useToken";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function App() {
  const { token, removeToken, setToken, id, removeId, setId } = useToken();

  return (
    <BrowserRouter>
      {!token && token !== "" && token !== undefined ? (
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <Login token={token} setToken={setToken} id={id} setId={setId} />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <Fragment>
          <Routes>
            <Route
              index
              element={
                <Dashboard
                  token={token}
                  removeToken={removeToken}
                  id={id}
                  removeId={removeId}
                />
              }
            />
          </Routes>
        </Fragment>
      )}
      {/* <Route path="contact" element={<Contact />} /> */}
      {/* <Route path="*" element={<NoPage />} /> */}
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
