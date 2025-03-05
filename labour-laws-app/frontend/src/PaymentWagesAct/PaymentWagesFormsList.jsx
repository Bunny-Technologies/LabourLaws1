import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentWagesForm.css";

const PaymentWagesForms = [
    { id: 1, name: "Form I - Register of Fines", file: "payment_of_wages_form1.pdf",disabled: true },
    { id: 2, name: "Form II - Register of Deductions for Damage or Loss", file: "payment_of_wages_form2.pdf",disabled: true },
    { id: 3, name: "Form III - Register of Advances", file: "payment_of_wages_form3.pdf",disabled: true },
    { id: 4, name: "Form IV - Annual Return", file: "payment_of_wages_form4.pdf",disabled: true },
    { id: 5, name: "Form V - Notice of Payment of Wages", file: "payment_of_wages_form5.pdf",disabled: true }
];

    
const PaymentWagesFormsList = () => {
    const navigate = useNavigate();
  
    const handleFormClick = (form) => {
  navigate(`/payment-of-wages-act-1936/form/${form.id}`, { state: { form } });
};

  
return (
    <div className="factories-forms-container">
      <h2 className="form-heading">📜 Payment of Wages Act, 1936 - Forms</h2>
      <table className="factories-forms-table">
        <thead>
          <tr>
            <th>#</th>
            <th>📄 Form Name</th>
          </tr>
        </thead>
        <tbody>
          {PaymentWagesForms.map((form, index) => (
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
  
  export default PaymentWagesFormsList;