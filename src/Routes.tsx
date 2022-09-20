import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { mainContext } from "./context/main";
import Error404 from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Settings from "./Pages/Settings";

function Routing(): JSX.Element {
  const context = useContext(mainContext);

  return (
    <BrowserRouter>
      <Routes>
        {context.loggedUserData ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/settings/:id" element={<Settings />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
