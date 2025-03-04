import React from "react";
import { useNavigate } from "react-router-dom";
import "./MaternityBenefitForm.css";

const MaternityBenefitForms = [
  { id: 1, name: "Form 18 - Claim for Maternity Benefit", file: "maternity_form18.pdf" }, 
  { id: 2, name: "Form 19 - Notice of Pregnancy", file: "maternity_form19.pdf" }, 
  { id: 3, name: "Form 20 - Certificate of Pregnancy", file: "maternity_form20.pdf" }, 
  { id: 4, name: "Form 21 - Certificate of Expected Confinement", file: "maternity_form21.pdf" }, 
  { id: 5, name: "Form 22 - Claim for Maternity Benefit for Sickness", file: "maternity_form22.pdf" }, 
  { id: 6, name: "Form 23 - Claim for Maternity Benefit by Nominee", file: "maternity_form23.pdf", disabled:true },
  { id: 7, name: "Form 24 - Certificate of Delivery", file: "maternity_form_24.pdf" },
  { id: 8, name: "Form 25 - Claim for Medical Bonus", file: "maternity_form_25.pdf", disabled:true  }
];

    
const MaternityBenefitFormsList = () => {
    const navigate = useNavigate();
  
    const handleFormClick = (form) => {
  navigate(`/maternity-benefit-act/form/${form.id}`, { state: { form } });
};

  
return (
    <div className="factories-forms-container">
      <h2 className="form-heading">📜 Maternity Benefit Act, 1961 - Forms - Forms</h2>
      <table className="factories-forms-table">
        <thead>
          <tr>
            <th>#</th>
            <th>📄 Form Name</th>
          </tr>
        </thead>
        <tbody>
          {MaternityBenefitForms.map((form, index) => (
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
  
  export default MaternityBenefitFormsList;