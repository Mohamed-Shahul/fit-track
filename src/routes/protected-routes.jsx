import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home-view";
import CreateWorkoutPlan from "../components/create-workout/create-workout-view";
import TodaysWorkoutPlan from "../components/todays-workout/todays-workout-view";
import ChooseWorkoutView from "../components/choose-workout/choose-workout-view";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/create-workout" element={<CreateWorkoutPlan />} />
      <Route path="/todays-workout" element={<TodaysWorkoutPlan />} />
      <Route path="/choose-workout" element={<ChooseWorkoutView />} />
    </Routes>
  );
};

export default ProtectedRoutes;
