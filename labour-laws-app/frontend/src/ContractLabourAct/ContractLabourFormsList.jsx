import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContractLabourForm.css";

const ContractLabourForms = [
    { id: 1, name: "Form XII - Register of Contractors", file: "contract_form_xii.pdf" },
    { id: 2, name: "Form XXII - Register of Advances", file: "contract_form_xxii.pdf" },
    { id: 3, name: "Form XIII - Register of Workmen Employed by Contractor", file: "" },
    { id: 4, name: "Form XIV - Employment Card", file: "" },
    { id: 5, name: "Form XV - Service Certificate", file: "" },
    { id: 6, name: "Form XVI - Muster Roll", file: "", disabled: true },
    { id: 7, name: "Form XVII - Register of Wages", file: "" , disabled: true},
    { id: 8, name: "Form XVIII - Register of Deductions for Damage or Loss", file: "" },
    { id: 9, name: "Form XIX - Register of Fines", file: "" },
    { id: 10, name: "Form XXI - Register of Overtime", file: "" },
];

    
const ContractLabourFormsList = () => {
    const navigate = useNavigate();
  
    const handleFormClick = (form) => {
  navigate(`/contract-labour-act-1970/form/${form.id}`, { state: { form } });
};

  
return (
    <div className="factories-forms-container">
      <h2 className="form-heading">📜 Contract Labour Regulation Act, 1970 - Forms</h2>
      <table className="factories-forms-table">
        <thead>
          <tr>
            <th>#</th>
            <th>📄 Form Name</th>
          </tr>
        </thead>
        <tbody>
          {ContractLabourForms.map((form, index) => (
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
  
  export default ContractLabourFormsList;