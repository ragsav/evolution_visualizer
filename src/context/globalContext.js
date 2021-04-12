import React, { createRef, useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const GlobalStateContext = React.createContext(undefined);
const GlobalActionsContext = React.createContext(undefined);

const GlobalContextProvider = ({ children }) => {
  const [status, setStatus] = useState("Paused");
  const [restarted, setRestart] = useState(true);
  const [speed, setSpeed] = useState(1);
  // const [calamity, setCalamity] = useState("radiation");

  const [calamityType, setCalamityType] = useState("radiation");
  const [calamityPosition, setCalamityPosition] = useState(null);
  const [calamityDuration, setCalamityDuration] = useState(10000);
  const [calamitySize, setCalamitySize] = useState(100);
  const [calamityAmplitude, setCalamityAmplitude] = useState(6);
  const [calamities, setCalamities] = useState([]);

  const calamitiesOrg = useRef([]);
  


  const [earthQuakePosition, setEarthQuakePosition] = useState(null);
  const [earthQuakeDuration, setEarthQuakeDuration] = useState(10000);
  const [earthQuakeAmplitude, setEarthQuakeAmplitude] = useState(4);
  const [earthQuakeRadius, setEarthQuakeRadius] = useState(100);

  const [volcanoPosition, setVolcanoPosition] = useState(null);
  const [volcanoDuration, setVolcanoDuration] = useState(10000);
  const [volcanoSize, setVolcanoSize] = useState(100);

  const [radiationPosition, setRadiationPosition] = useState(null);
  const [radiationDuration, setRadiationDuration] = useState(10000);
  const [radiationAmplitude, setRadiationAmplitude] = useState(4);
  const [radiationRadius, setRadiationRadius] = useState(100);
  // useEffect(() => {
  //   console.log(volcanoPosition);
  // }, [volcanoPosition]);


  function addCalamity()  {
    const uid = uuidv4();
    const calamity = {
      id:uid,
      type: calamityType,
      position: calamityPosition,
      duration: calamityDuration,
      amplitude: calamityAmplitude,
      size: calamitySize,
      start:Date.now()
    };

    const calamitiesTemp = calamitiesOrg.current;
    calamitiesTemp.push(calamity);
    calamitiesOrg.current = calamitiesTemp;
    setCalamities([...calamitiesTemp]);
    return uid;
  }

  function removeCalamityById(id){
    const calamitiesTemp = calamitiesOrg.current
    const l = calamitiesTemp.length;
    for(var i=0;i<l;i++){
      if(calamitiesTemp[i].id.localeCompare(id)===0){
        calamitiesTemp.splice(i, 1);
        break;
      }
    }
    calamitiesOrg.current = calamitiesTemp;
    if(calamitiesTemp.length===0){
      setCalamityPosition(null);
    }
    setCalamities([...calamitiesTemp]);
    
  }

  useEffect(() => {
    
    if (calamitiesOrg.current.length < 5 && calamityPosition) {
      const newUid = addCalamity();
     
      const interval = setInterval(() => {
        removeCalamityById(newUid);
      }, [calamityDuration]);
      if (calamitiesOrg.current.length === 0) {
        return () => {
          clearInterval(interval);
        };
      }

      
      
    }
  }, [calamityPosition]);
  return (
    <GlobalStateContext.Provider
      value={{
        status,
        speed,
        restarted,
        

        calamityType,
        calamityAmplitude,
        calamityDuration,
        calamityPosition,
        calamitySize,
        calamities,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setStatus,
          setSpeed,
          setRestart,
          

          setCalamityType,
          setCalamityAmplitude,
          setCalamityDuration,
          setCalamityPosition,
          setCalamitySize,
          
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
