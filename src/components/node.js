import { useEffect, useState ,useRef} from "react";
import ReactDom from "react-dom"
import React from "react"
import {Card} from "react-bootstrap";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import "./node.css";
import { v4 as uuidv4 } from "uuid";
const Node = (props)=>{

    const bounds = props.bounds;
    const size = 10;
    
    
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({
      x: Math.floor(Math.random() * bounds.w),
      y: Math.floor(Math.random() * bounds.h),
    });
    const [color,setColor] = useState(props.color?props.color:"#5EFF00")

    
    useEffect(()=>{
        var timeInterval = setInterval(()=>{
            
            
            
            const pos = [1,-1]
            const skipX = Math.floor(Math.random()*50);
            const skipY = Math.floor(Math.random() * 50);

            const plusMinusX = Math.floor(Math.random()*2);
            const plusMinusY = Math.floor(Math.random() * 2);

            const newPosition = {
              x: position.x + pos[plusMinusX] * skipX,
              y: position.y + pos[plusMinusY] * skipY,
            };
            if(newPosition.x > bounds.w + bounds.l){
                newPosition.x = bounds.w;
            }
            if (newPosition.y > bounds.h + bounds.t) {
              newPosition.y = bounds.h;
            }
            if (newPosition.x < bounds.l) {
              newPosition.x = bounds.l;
            }
            if (newPosition.y< bounds.t) {
              newPosition.y = bounds.t;
            }

            
            setPosition({...newPosition});
            setColor("#5EFF00");
            if(true){
                const children = nodeRef.current?.parentNode?.childNodes;
                if(children){
                    Object.keys(children).forEach((key) => {
                      if (
                        children[key]?.nodeName === "DIV" &&
                        Math.abs(
                          children[key].offsetLeft - nodeRef.current.offsetLeft
                        ) < 10 &&
                        Math.abs(
                          children[key].offsetTop - nodeRef.current.offsetTop
                        ) < 10 &&
                        children[key].firstChild.id.localeCompare(
                          `${props.uid}+123`
                        ) !== 0
                      ) {
                        if (Math.random() > 0.7) {
                          
                          const creatures = props.creatures;
                          const k = uuidv4();
                          creatures.push(
                            <Node
                              uid={k}
                              key={k}
                              color = "#FF0000"
                              screenRef={props.screenRef}
                              setCreatures={props.setCreatures}
                              creatures={creatures}
                              bounds={bounds}
                            >
                              <span key={`${k}+123`} id={`${k}+123`}></span>
                            </Node>
                          );
                          props.setCreatures([...creatures]);
                        }

                        //do mating here
                      }
                    });
                }
                
            }

        },100);
        return ()=>{
            clearInterval(timeInterval);
        }
        
    },[position])

    useEffect(()=>{
        if(nodeRef&&nodeRef.current){
            
        }
    },[nodeRef])

    
    return (
      <Card
        ref={nodeRef}
        style={{
          backgroundColor: color,
          height: size,
          width: size,
          top: position.y,
          left: position.x,
          position: "absolute",
          borderRadius: size / 2,
          border: "none",
          transition: "all 2s ease-in-out",
        }}
      >
        {props.children}
      </Card>
    );
}

export default Node;