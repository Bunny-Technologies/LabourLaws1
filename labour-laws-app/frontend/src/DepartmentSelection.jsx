import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DepartmentSelection.css";

const DepartmentSelection = () => {
  const navigate = useNavigate();
  const [activeDepartment, setActiveDepartment] = useState(null);

  const departments = [
    { name: "Factories Act, 1948", enabled: true },
    { name: "Contract Labour Regulation Act, 1970", enabled: true },
    { name: "Employment Exchanges Act, 1959", enabled: false },
    { name: "Minimum Wages Act, 1948", enabled: false },
    { name: "Payment of Wages Act, 1936", enabled: true },
    { name: "Workmen Compensation Act, 1923", enabled: true },
    { name: "Maternity Benefit Act, 1961", enabled: true },
    { name: "Gratuity Act, 1972", enabled: false },
    { name: "Equal Remuneration Act, 1976", enabled: false },
  ];

  const handleSelectDepartment = (dept) => {
    if (dept.enabled) {
      setActiveDepartment(dept.name);
      setTimeout(() => navigate(`/forms/${dept.name.replace(/\s+/g, "-").toLowerCase()}`), 300);
    }
  };

  return (
    <div className="govt-page">
      {/* Header with Navigation */}
      <header className="govt-header">
        <h1>Regulatory, Labour Law Risk Management Software</h1>
        <nav>
          <button>Industrial / Labour Law Compliances</button>
          <button>Filing Due Dates / Returns</button>
          <button>Significance of Legal Services</button>
          <button>Bare Acts</button>
          <button>Employer Login</button>
        </nav>
      </header>

      <div className="govt-content">
        {/* Sidebar for Departments */}
        <aside className="govt-sidebar">
          <h3>Labour Law Categories</h3>
          <ul>
            {departments.map((dept) => (
              <li
                key={dept.name}
                className={`dept-item ${dept.enabled ? "enabled" : "disabled"}`}
                onClick={() => handleSelectDepartment(dept)}
              >
                {dept.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Section */}
        <main className="govt-main">
          <h2>Manage Labour Law Compliances</h2>
          <p>
            Labour Law Compliance is no longer an ad-hoc activity as it involves risk at the
            organizational level. In order to stay compliant with regulatory guidelines,
            companies must ensure structured compliance mechanisms...
          </p>
          <div className="highlight-box">
            <strong>Non-Compliance is a Big Risk!</strong>
            <p>
              Managing Labour Law Compliances is important for any organization...
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentSelection;
