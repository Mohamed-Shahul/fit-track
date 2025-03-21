import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/home-view";
import AppBarView from "./components/app-bar/app-bar-view";

function App() {
  return (
    <div className="App">
      <AppBarView />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
