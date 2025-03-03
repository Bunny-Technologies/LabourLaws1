import React from "react";
import { useNavigate } from "react-router-dom";
import "./LabourLawCategories.css";

const LabourLawCategories = () => {
  const navigate = useNavigate();

  const departments = [
    { name: "Factories Act, 1948", enabled: true },
    { name: "Contract Labour Regulation Act, 1970", enabled: true },
    { name: "Employment Exchanges Act, 1959", enabled: false },
    { name: "Minimum Wages Act, 1948", enabled: false },
    { name: "Payment of Wages Act, 1936", enabled: true },
    { name: "Workmen Compensation Act, 1923", enabled: true },
    { name: "Maternity Benefit Act, 1961", enabled: true },
  ];

  const handleSelectDepartment = (dept) => {
    if (dept.enabled) {
      navigate(`/forms/${dept.name.replace(/\s+/g, "-").toLowerCase()}`);
    }
  };

  return (
    <div className="law-categories-container">
      <h2>Labour Law Categories</h2>
      <ul className="law-category-list">
        {departments.map((dept, index) => (
          <li
            key={index}
            className={`law-category-item ${dept.enabled ? "enabled" : "disabled"}`}
            onClick={() => handleSelectDepartment(dept)}
          >
            {dept.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabourLawCategories;
