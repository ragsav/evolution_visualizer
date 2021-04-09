import { createRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import Node from "./node";
import { v4 as uuidv4 } from "uuid";

const demo = Array.from(Array(20).keys());
const Screen = ()=>{

    
    // const {ground} = useGlobalState();
    const [trueRef,setTrueRef] = useState(null);
    const screenRef = useRef(null);
    
    const [creatures,setCreatures] = useState([])
  
    

    



    
    

    useEffect(()=>{
        console.log(creatures.length)
        if(Math.random()>0.7){
            var timeInterval = setInterval(() => {
              const l = creatures.length;
              const index = Math.random() * l;
              const creaturesTemp = [...creatures];
              creaturesTemp.splice(index, 1);
              setCreatures([...creaturesTemp]);
            }, 100);
            return () => {
              clearInterval(timeInterval);
            };
        }
        
    },[creatures])

   function addCreature(c) {
     creatures.push(c);

     setCreatures([...creatures]);
   }
    
    useEffect(()=>{
        if(screenRef){
            if(screenRef.current){
                setTrueRef(screenRef.current);
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
                setCreatures([...creatures])
            }
        }
    },[screenRef])

    

    

    




    return (
      <div
      id="screen"
        style={{ height: "100%", width: "100%", backgroundColor: "#1E1E1E" }}
        ref={screenRef}
      >
        {trueRef ? creatures : null}
      </div>
    );
}

export default Screen;