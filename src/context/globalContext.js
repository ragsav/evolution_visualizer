import React, { createRef, useEffect, useState, useRef } from "react";

const GlobalStateContext = React.createContext(undefined);
const GlobalActionsContext = React.createContext(undefined);

const GlobalContextProvider = ({ children }) => {
  const [status, setStatus] = useState("Paused");
  const [restarted, setRestart] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [earthQuakePosition, setEarthQuakePosition] = useState(null);
  const [earthQuakeDuration, setEarthQuakeDuration] = useState(10000);
  const [earthQuakeAmplitude,  setEarthQuakeAmplitude] = useState(4);
  const [earthQuakeRadius,setEarthQuakeRadius] = useState(100);


  useEffect(()=>{
    
  },[earthQuakePosition])
  return (
    <GlobalStateContext.Provider
      value={{
        status,
        speed,
        restarted,
        earthQuakePosition,
        earthQuakeDuration,
        earthQuakeAmplitude,
        earthQuakeRadius
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setStatus,
          setSpeed,
          setRestart,
          setEarthQuakePosition,
          setEarthQuakeDuration,
          setEarthQuakeAmplitude,
          setEarthQuakeRadius
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState error");
  }

  return context;
};

const useGlobalActions = () => {
  const context = React.useContext(GlobalActionsContext);
  if (context === undefined) {
    throw new Error("useGlobalActions error");
  }

  return context;
};

export { useGlobalState, useGlobalActions, GlobalContextProvider };
