import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home-view";
import SignUpView from "../components/sign-up/sign-up-view";
import CreateWorkoutPlan from "../components/create-workout/create-workout-view";
import TodaysWorkoutPlan from "../components/todays-workout/todays-workout-view";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpView />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-workout" element={<CreateWorkoutPlan />} />
      <Route path="/todays-workout" element={<TodaysWorkoutPlan />} />
    </Routes>
  );
};

export default ProtectedRoutes;
