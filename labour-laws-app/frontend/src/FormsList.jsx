import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FormsList.css";

const FormsList = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 Department from URL:", department);
  }, [department]);

  // Sample Forms for Each Department
  const forms = [
    "Form A - Certificate of Fitness",
    "Form B - Register of Advances",
    "Form C - Register of Accidents",
    "Form D - Dust & Fume Report",
    "Form E - Register of Contractors",
  ];

  const handleSelectForm = (form) => {
    navigate(`/form/${form.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return (
    <div className="forms-container">
      <h2>{department ? department.replace("-", " ") : "Loading..."} - Forms</h2>
      <ul className="form-list">
        {forms.map((form, index) => (
          <li key={index} className="form-item">
            <button onClick={() => handleSelectForm(form)}>{form}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsList;
