import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LogInView from "./components/log-in/log-in-view";
import ProtectedRoutes from "./routes/protected-routes";
import PrivateRoute from "./routes/ptivate-routes";
import { isAuthenticated } from "./utilis/auth";
import SignUpView from "./components/sign-up/sign-up-view";

function App() {
  return (
    <div className="App">
      <Routes key={localStorage.getItem("isAuthenticated")}>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/home" /> : <LogInView />}
        />
        <Route path="/sign-up" element={<SignUpView />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <ProtectedRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
