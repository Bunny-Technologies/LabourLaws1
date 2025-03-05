import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./PaymentWagesForm.css";

const PaymentWagesFormPage = () => {
  const location = useLocation();
  const { form } = location.state || {};

  if (!form) {
    return <h2>No Form Selected</h2>;
  }

  // ✅ Form Structure
  const formFields = {
    
  };
  

  // ✅ State for form data & errors
  const [formData, setFormData] = useState(
    formFields[form.id]?.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}) || {}
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate as user types
    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };const validateField = (name, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "This field is required.";
    }
    return errorMsg;
};


  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate all fields before submission
    formFields[form.id]?.forEach((field) => {
      const errorMsg = validateField(field.name, formData[field.name]);
      if (errorMsg) validationErrors[field.name] = errorMsg;
    });

    console.log("Validation Errors:", validationErrors); // Debugging

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      alert("✅ Form submitted successfully! Now you can download the PDF.");
    } else {
      setErrors(validationErrors);
    }
};


  // ✅ Handle PDF Generation
  const handleDownloadPDF = () => {
    if (!submitted) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    let title = "";
    let subtitle = "";
    let fileName = "";

    // Define form-specific titles and filenames for Payment of Wages Act forms
    switch (form.id) {
        case 14:
            title = "FORM I - REGISTER OF FINES";
            subtitle = "Record of Fines Under Payment of Wages Act, 1936";
            fileName = "Register_of_Fines.pdf";
            break;
        case 15:
            title = "FORM II - REGISTER OF DEDUCTIONS FOR DAMAGE OR LOSS";
            subtitle = "Details of Deductions from Wages";
            fileName = "Register_of_Deductions_for_Damage_or_Loss.pdf";
            break;
        case 16:
            title = "FORM III - REGISTER OF ADVANCES";
            subtitle = "Record of Advances Given to Employees";
            fileName = "Register_of_Advances.pdf";
            break;
        case 17:
            title = "FORM IV - ANNUAL RETURN";
            subtitle = "Yearly Wage Payment Report";
            fileName = "Annual_Return.pdf";
            break;
        case 18:
            title = "FORM V - NOTICE OF PAYMENT OF WAGES";
            subtitle = "Official Notification of Wage Payment";
            fileName = "Notice_of_Payment_of_Wages.pdf";
            break;
        default:
            title = "PAYMENT OF WAGES FORM";
            subtitle = "Generated Report Under Payment of Wages Act, 1936";
            fileName = "Payment_of_Wages_Form_Report.pdf";
            break;
    }

    // Formatting Header
    doc.setTextColor(0, 0, 139); // Dark Blue
    doc.text(title, 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(subtitle, 105, 30, null, null, "center");

    // Formatting the "Generated Form Data" section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Generated Form Data:", 20, 50);

    let y = 60;
    doc.setFontSize(12);
    formFields[form.id]?.forEach((field) => {
        doc.setFont("helvetica", "normal");
        doc.text(`${field.label}:`, 20, y);
        doc.setFont("helvetica", "bold");
        doc.text(`${formData[field.name] || "N/A"}`, 100, y);
        y += 10;
    });

    // Save the PDF with a dynamic filename
    doc.save(fileName);
};

  return (
    <div className="factories-form-page">
  <h2>{form?.name}</h2>

  <form
    className="factories-form"
    onSubmit={handleSubmit}
    style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }}
  >
    <fieldset>
      <legend>Fill in the details</legend>
      
      {formFields[form.id]?.map((field, index) => (
        <div key={index} className="form-group">
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="form-input"
          />
          {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
        </div>
      ))}
    </fieldset>

    <div className="form-buttons">
  <button type="submit" className="submit-btn" disabled={submitted}>
    ✅ Submit
  </button>
  {submitted && (
    <button onClick={handleDownloadPDF} className="download-btn">
      📥 Download PDF
    </button>
  )}
</div>
  </form>
</div>

  );
};

export default PaymentWagesFormPage;
