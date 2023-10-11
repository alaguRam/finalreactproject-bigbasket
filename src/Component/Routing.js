import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { stateContext } from "./CreateContext";
import { initialState, reducer } from "./InitialState";
import Main from "./Main";
import SmartDetails from "./SmartBasket/SmartDetails";

const Routing = () => {
    const[state,dispatch]=useReducer(reducer,initialState);
  return (
    <stateContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/details" element={<SmartDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </stateContext.Provider>
  );
};

export default Routing;

