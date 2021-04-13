import logo from './logo.svg';
import './App.css';
import Ripples from "react-ripples";
import "bootstrap/dist/css/bootstrap.min.css";
// import Screen from './components/screen';
import { GlobalContextProvider } from './context/globalContext';
import Earth from "./components/screen";
import Statisitcs from "./components/statistics"
import { Row } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Statisitcs
          
          
          style={{ position: "absolute", top: 5, left: 5 }}
        ></Statisitcs>
        <Earth></Earth>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
