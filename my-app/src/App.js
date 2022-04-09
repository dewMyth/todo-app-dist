import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ResponsiveAppBar from "./components/NavBar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
