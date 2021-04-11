import logo from './logo.svg';
import './App.css';
import Ripples from "react-ripples";
import "bootstrap/dist/css/bootstrap.min.css";
// import Screen from './components/screen';
import { GlobalContextProvider } from './context/globalContext';
import Earth from "./components/screen";
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        
          <Earth></Earth>
        
      </GlobalContextProvider>
    </div>
  );
}

export default App;
