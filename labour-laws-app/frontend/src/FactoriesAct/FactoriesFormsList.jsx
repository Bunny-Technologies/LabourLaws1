import React from "react";
import { useNavigate } from "react-router-dom";
import "./FactoriesForm.css";

const factoriesForms = [
    { id: 1, name: "Form 26A - Dust and Fume Report", file: "factories_form26a.pdf" },
    { id: 2, name: "Form 29 - Register of Accidents", file: "factories_form29.pdf" },
    { id: 3, name: "Form 33 - Certificate of Fitness", file: "factories_form33.pdf" },
    { id: 4, name: "Form 1 - Application for Permission to Construct/Extend a Factory", file: "" },
    { id: 5, name: "Form 2 - Notice of Occupation", file: "" },
    { id: 6, name: "Form 3 - Register of Adult Workers", file: "" },
    { id: 7, name: "Form 4 - Register of Child Workers", file: "" },
    { id: 8, name: "Form 5 - Certificate of Fitness for Young Workers", file: "" },
    { id: 9, name: "Form 10 - Register of Leave with Wages", file: "" },
    { id: 10, name: "Form 11 - Health Register", file: "" },
    { id: 11, name: "Form 18 - Report of Dangerous Occurrences", file: "", disabled: true },
    { id: 12, name: "Form 20 - Humidity Register", file: "" , disabled: true},
    { id: 13, name: "Form 21 - Register of Whitewashing and Repairs", file: "", disabled: true }
];
    

const FactoriesFormsList = () => {
    const navigate = useNavigate();
  
    const handleFormClick = (form) => {
  navigate(`/factories-act-1948/form/${form.id}`, { state: { form } });
};

  
return (
    <div className="factories-forms-container">
      <h2 className="form-heading">📜 Factories Act, 1948 - Forms</h2>
      <table className="factories-forms-table">
        <thead>
          <tr>
            <th>#</th>
            <th>📄 Form Name</th>
          </tr>
        </thead>
        <tbody>
          {factoriesForms.map((form, index) => (
            <tr
              key={form.id}
              className={`form-row ${form.disabled ? "disabled-form" : "clickable-form"}`}
              onClick={() => !form.disabled && handleFormClick(form)} // Prevents click if disabled
            >
              <td>{index + 1}</td>
              <td>{form.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  };
  
  export default FactoriesFormsList;