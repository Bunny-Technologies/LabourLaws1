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
      let formattedPath = dept.name.replace(/\s+/g, "-").replace(/,/g, "").toLowerCase();
      navigate(`/${formattedPath}`); // ✅ Navigating to /factories-act-1948
    }
  };
  

  return (
    <div className="govt-page">
      {/* Header with Navigation */}
      <header className="govt-header">
        <h1>Government Labour Law Compliance Portal</h1>
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
            Labour Law Compliance is essential for organizations to mitigate legal risks and adhere to government regulations.
            Companies must establish structured compliance mechanisms to ensure proper governance.
          </p>
          <div className="highlight-box">
            <strong>⚠️ Non-Compliance is a Serious Risk!</strong>
            <p>
              Failure to comply with labour laws can result in legal penalties, financial losses, and reputational damage. 
              Ensure your organization is compliant with the latest government regulations.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentSelection;
