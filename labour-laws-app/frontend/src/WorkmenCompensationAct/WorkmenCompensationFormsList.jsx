import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkmenCompensationForm.css";

const WorkmenCompensationForms = [
    { id: 1, name: "Form A - Application for Compensation", file: "workmen_compensation_formA.pdf" ,disabled: true },
    { id: 2, name: "Form B - Report of Fatal Accident", file: "workmen_compensation_formB.pdf",disabled: true },
    { id: 3, name: "Form C - Agreement as to Compensation", file: "workmen_compensation_formC.pdf",disabled: true },
    { id: 4, name: "Form D - Deposit of Compensation for Fatal Accident", file: "workmen_compensation_formD.pdf",disabled: true },
    { id: 5, name: "Form E - Receipt for Compensation", file: "workmen_compensation_formE.pdf",disabled: true }
];

    
const WorkmenCompensationFormsList = () => {
    const navigate = useNavigate();
  
    const handleFormClick = (form) => {
  navigate(`/workmen-compensation-act-1923/form/${form.id}`, { state: { form } });
};

  
return (
    <div className="factories-forms-container">
      <h2 className="form-heading">📜 Workmen's Compensation Act, 1923 - Forms</h2>
      <table className="factories-forms-table">
        <thead>
          <tr>
            <th>#</th>
            <th>📄 Form Name</th>
          </tr>
        </thead>
        <tbody>
          {WorkmenCompensationForms.map((form, index) => (
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
  
  export default WorkmenCompensationFormsList;