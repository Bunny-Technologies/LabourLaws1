import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import LabourLawCategories from "./LabourLawCategories";
import DepartmentSelection from "./DepartmentSelection";
import FormsList from "./FormsList";
import FormPage from "./FormPage";
import FactoriesFormsList from "./FactoriesAct/FactoriesFormsList";
import FactoriesFormPage from "./FactoriesAct/FactoriesFormPage";

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
          <Route path="/factories-act-1948" element={<FactoriesFormsList />} />
          <Route path="/factories-act/form/:id" element={<FactoriesFormPage />} />
          <Route path="/factories-act-1948/form/:id" element={<FactoriesFormPage />} />

        </>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
