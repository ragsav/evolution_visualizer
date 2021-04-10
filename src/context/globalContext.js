import React, { createRef, useEffect, useState ,useRef} from "react";



const GlobalStateContext = React.createContext(undefined);
const GlobalActionsContext = React.createContext(undefined);



const GlobalContextProvider = ({ children }) => {
  

  const [status,setStatus] = useState("Paused")
  const [speed,setSpeed] = useState(1);

  return (
    <GlobalStateContext.Provider
      value={{
        status,
        speed
      }}
      
    >
      <GlobalActionsContext.Provider value={{ setStatus ,setSpeed}}>
        {children}
      </GlobalActionsContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalState error"
    );
  }

  return context;
};

const useGlobalActions = () => {
  const context = React.useContext(GlobalActionsContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalActions error"
    );
  }

  return context;
};

export { useGlobalState, useGlobalActions, GlobalContextProvider };
