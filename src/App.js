import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home-view";
import CreateWorkoutPlan from "./components/create-workout/create-workout-view";
import TodaysWorkoutPlan from "./components/todays-workout/todays-workout-view";
import LogInView from "./components/log-in/log-in-view";
import SignUpView from "./components/sign-up/sign-up-view";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInView />} />
        <Route path="/sign-up" element={<SignUpView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-workout" element={<CreateWorkoutPlan />} />
        <Route path="/todays-workout" element={<TodaysWorkoutPlan />} />
      </Routes>
    </div>
  );
}

export default App;
