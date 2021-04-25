import logo from './logo.svg';
import './App.css';
import Ripples from "react-ripples";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContextProvider } from './context/globalContext';
import Earth from "./components/earth";
import Statisitcs from "./components/statistics"
import { Row } from 'react-bootstrap';
import { ThemeProvider } from "./context/themeContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Docs from "./components/docs/docs";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/evolution_visualizer" exact>
            <ThemeProvider>
              <GlobalContextProvider>
                <Statisitcs
                  style={{ position: "absolute", top: 5, left: 5 }}
                ></Statisitcs>
                <Earth></Earth>
              </GlobalContextProvider>
            </ThemeProvider>
          </Route>
          <Route path="/evolution_visualizer/docs" exact>
            <Docs></Docs>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
