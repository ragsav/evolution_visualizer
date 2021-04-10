import { createRef, useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import Node from "./node";
import { v4 as uuidv4 } from "uuid";
import Statisitcs from "./statistics";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}



const demo = Array.from(Array(20).keys());
const Screen = ()=>{

    
    // const {ground} = useGlobalState();
    const { setStatus } = useGlobalActions();
    const { status } = useGlobalState();
    const [trueRef,setTrueRef] = useState(null);
    const screenRef = useRef(null);
    
    const [isStatsVisible,setIsStatsVisible] = useState(false);
    const [creatures,setCreatures] = useState([])
  
     const prevCreatures = usePrevious(creatures);
    

    



    function InitializeCreatures()  {
      creatures.splice(0, creatures.length);
      demo.forEach((t, i) => {
        const k = uuidv4();
        
        creatures.push(
          <Node
            screenRef={screenRef}
            uid={k}
            key={k}
            setCreatures={setCreatures}
            creatures={creatures}
            bounds={{
              l: screenRef.current.offsetLeft,
              t: screenRef.current.offsetTop,
              w: screenRef.current.clientWidth,
              h: screenRef.current.clientHeight,
            }}
          >
            <span key={`${k}+123`} id={`${k}+123`}></span>
          </Node>
        );
      });
      setCreatures([...creatures]);
    }

    useEffect(() => {
      console.log(creatures.length);

      if (
        status.localeCompare("Playing") === 0 &&
        Math.random() > 0.7 &&
        creatures.length !== prevCreatures.length
      ) {
        const l = creatures.length;
        const index = Math.random() * l;
        const creaturesTemp = [...creatures];
        creaturesTemp.splice(index, 1);
        setCreatures([...creaturesTemp]);
      }
    }, [creatures]);

    useEffect(() => {
      if (status.localeCompare("Finished") === 0) {
        InitializeCreatures();
      }
    }, [status]);

    useEffect(() => {
      if (screenRef) {
        if (screenRef.current) {
          setTrueRef(screenRef.current);
          InitializeCreatures();
        }
      }
    }, [screenRef]);

    

    

    




    return (
      <div
        id="screen"
        style={{ height: "100%", width: "100%", backgroundColor: "#1E1E1E" }}
        ref={screenRef}
      >
        {isStatsVisible === false ? (
          <IconButton
            style={{ position: "absolute", top: 5, left: 5 }}
            onClick={(e) => {
              e.preventDefault();
              setIsStatsVisible(true);
            }}
          >
            <DehazeIcon style={{ color: "white" }}></DehazeIcon>
          </IconButton>
        ) : (
          <Statisitcs
            setIsStatsVisible = {setIsStatsVisible}
            style={{position: "absolute", top: 5, left: 5 }}
          ></Statisitcs>
        )}
        {trueRef ? creatures : null}
      </div>
    );
}

export default Screen;