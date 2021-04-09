import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import Screen from './components/screen';
import { GlobalContextProvider } from './context/globalContext';
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Screen></Screen>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
