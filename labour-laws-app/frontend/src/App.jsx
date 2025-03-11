import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import LabourLawCategories from "./LabourLawCategories";
import DepartmentSelection from "./DepartmentSelection";
import FactoriesFormsList from "./FactoriesAct/FactoriesFormsList";
import FactoriesFormPage from "./FactoriesAct/FactoriesFormPage";
import ContractLabourFormsList from "./ContractLabourAct/ContractLabourFormsList";
import ContractLabourFormPage from "./ContractLabourAct/ContractLabourFormPage";
import MaternityBenefitFormsList from "./MaternityBenefitAct/MaternityBenefitFormsList";
import MaternityBenefitFormPage from "./MaternityBenefitAct/MaternityBenefitFormPage";
import PaymentWagesFormsList from "./PaymentWagesAct/PaymentWagesFormsList";
import PaymentWagesFormPage from "./PaymentWagesAct/PaymentWagesFormPage";
import WorkmenCompensationFormsList from "./WorkmenCompensationAct/WorkmenCompensationFormsList";
import WorkmenCompensationFormPage from "./WorkmenCompensationAct/WorkmenCompensationFormPage";
import Reports from "./Reports";

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
          <Route path="/factories-act-1948" element={<FactoriesFormsList />} />
          <Route path="/factories-act/form/:id" element={<FactoriesFormPage />} />
          <Route path="/factories-act-1948/form/:id" element={<FactoriesFormPage />} />
          <Route path="/contract-labour-regulation-act-1970" element={<ContractLabourFormsList />} />
          <Route path="/contract-labour-act-1970/form/:id" element={<ContractLabourFormPage />} />
          <Route path="/maternity-benefit-act-1961" element={<MaternityBenefitFormsList />} />
          <Route path="/maternity-benefit-act/form/:id" element={<MaternityBenefitFormPage />} />
          <Route path="/payment-of-wages-act-1936" element={<PaymentWagesFormsList />} />
          <Route path="/payment-of-wages-act/form/:id" element={<PaymentWagesFormPage />} />
          <Route path="/workmen-compensation-act-1923" element={<WorkmenCompensationFormsList />} />
          <Route path="/workmen-compensation-act/form/:id" element={<WorkmenCompensationFormPage />} />
          <Route path="/reports" element={<Reports />} /> 
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
