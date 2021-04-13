import React, { createRef, useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const GlobalStateContext = React.createContext(undefined);
const GlobalActionsContext = React.createContext(undefined);

const GlobalContextProvider = ({ children }) => {
  const [status, setStatus] = useState("Paused");
  const [restarted, setRestart] = useState(true);
  const [speed, setSpeed] = useState(1);
  // const [calamity, setCalamity] = useState("radiation");

  const [calamityType, setCalamityType] = useState("none");
  const [calamityPosition, setCalamityPosition] = useState(null);
  const [calamityDuration, setCalamityDuration] = useState(10000);
  const [calamitySize, setCalamitySize] = useState(100);
  const [calamityAmplitude, setCalamityAmplitude] = useState(6);
  const [calamities, setCalamities] = useState([]);

  const calamitiesOrg = useRef([]);




  
  const [resourcePosition, setResourcePosition] = useState(null);
  const [resourceType,setResourceType] = useState("none");
  const [resourceSize,setResourceSize] = useState(70);
  const [resources, setResources] = useState([]);
  const resourcesOrg = useRef([]);
  


  
  

  function addResource() {
    const uid = uuidv4();
    const resource = {
      id: uid,
      type:resourceType,
      position: resourcePosition,
      size:resourceSize
    };

    const resourcesTemp = resourcesOrg.current;
    resourcesTemp.push(resource);
    resourcesOrg.current = resourcesTemp;
    setResources([...resourcesTemp]);
  }

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

  function removeResourceById(id){
    const resourcesTemp = resourcesOrg.current;
    const l = resourcesTemp.length;
    for (var i = 0; i < l; i++) {
      if (resourcesTemp[i].id.localeCompare(id) === 0) {
        resourcesTemp.splice(i, 1);
        break;
      }
    }
    resourcesOrg.current = resourcesTemp;
    if (resourcesTemp.length === 0) {
      setResourcePosition(null);
    }
    setResources([...resourcesTemp]);
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
    if (resourcesOrg.current.length < 5 && resourcePosition) {
      addResource();
    }
  }, [resourcePosition]);

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
        resourcePosition,
        resources,
        resourceType,
        resourceSize,
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
          removeResourceById,
          setResourcePosition,
          setResourceType,
          setResourceSize,
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
