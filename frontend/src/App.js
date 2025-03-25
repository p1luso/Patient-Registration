import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PatientForm from "./components/PatientForm/PatientForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PatientProvider } from "./context/patientContext";

function App() {
  return (
    <Router>
      <div>
      <PatientProvider>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-patient" element={<PatientForm />} />
        </Routes>
          </PatientProvider>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
