import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import LabourLawCategories from "./LabourLawCategories";
import DepartmentSelection from "./DepartmentSelection";
import FormsList from "./FormsList";
import FormPage from "./FormPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user") // ✅ Initialize state from localStorage
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]); // ✅ Watch isAuthenticated state

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <>
          <Route path="/departments" element={<DepartmentSelection />} />
          <Route path="/categories" element={<LabourLawCategories />} />
          <Route path="/forms/:department" element={<FormsList />} />
          <Route path="/form/:formName" element={<FormPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
