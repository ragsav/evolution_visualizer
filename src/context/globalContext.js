import React, { createRef, useEffect, useState ,useRef} from "react";



const GlobalStateContext = React.createContext(undefined);
const GlobalActionsContext = React.createContext(undefined);


const bounds = {w:window.innerWidth-20,h:window.innerHeight-20,l:10,t:10}
// bounds = {
//   l: screenRef.current.offsetLeft,
//   t: screenRef.current.offsetTop,
//   w: screenRef.current.clientWidth,
//   h: screenRef.current.clientHeight,
// };

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== "undefined") {
        savedCallback?.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};



const groundInitial = Array(100).fill(Array(100).fill({}));
groundInitial.forEach((row, i) => {
  row.forEach((cell, j) => {
    groundInitial[i][j] = createRef();

    const initialCreature = {
      row: i,
      col: j,
      birth: Date.now(),
      color: "#2BFF00",
    };
    groundInitial[i][j].current = Math.random() > 0.7 ? initialCreature : null;
  });

  groundInitial[i] = [...row];
});

const ga = function*(){

  for(var gen=0;gen<100;gen++){
    groundInitial.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (groundInitial[i][j].current) {
          const sign = [-1, 1];
          const signX = Math.floor(Math.random() * 2);
          const signY = Math.floor(Math.random() * 2);
          const distX = Math.floor(Math.random() * 2);
          const distY = Math.floor(Math.random() * 2);

          var rowNew = groundInitial[i][j].current.row + sign[signX] * distX;
          var colNew = groundInitial[i][j].current.col + sign[signY] * distY;

          if (rowNew < 0) rowNew = 0;
          if (rowNew >= 100) rowNew = 99;
          if (colNew < 0) colNew = 0;
          if (colNew >= 100) colNew = 99;

          groundInitial[rowNew][colNew].current = groundInitial[i][j].current;
          groundInitial[rowNew][colNew].current.row = rowNew;
          groundInitial[rowNew][colNew].current.col = colNew;
          groundInitial[i][j].current = null;
        }
      });
       groundInitial[i] = [...row];
    });
    yield{ground:groundInitial}

  }
  
  

    
    
  
}

const GlobalContextProvider = ({ children }) => {
  

  
  const [ground, setGround] = useState([]);
  const gaProcessSteps = ga();

  useEffect(()=>{
    console.log(gaProcessSteps)
  },gaProcessSteps)
    


  


  useInterval(() => {
    // console.log(gaProcessSteps)
    
    if (!gaProcessSteps) return;
    const next = gaProcessSteps.next();
    // console.log(next);
    if (next.done) return ;
    const groundState = next.value;
    
    setGround([...groundState.ground]);
    
  }, 2000);

  return (
    <GlobalStateContext.Provider
      value={{
        ground
      }}
      
    >
      <GlobalActionsContext.Provider value={{ setGround }}>
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
