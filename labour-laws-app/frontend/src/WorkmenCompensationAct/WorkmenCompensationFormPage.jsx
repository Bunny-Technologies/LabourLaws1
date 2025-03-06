import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./WorkmenCompensationForm.css";

const WorkmenCompensationFormPage = () => {
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

    // Define form-specific titles and filenames for Workmen’s Compensation Act forms
    switch (form.id) {
        case 1:
            title = "FORM A - APPLICATION FOR COMPENSATION";
            subtitle = "Claim for Compensation Under Workmen’s Compensation Act, 1923";
            fileName = "Application_for_Compensation.pdf";
            break;
        case 2:
            title = "FORM B - REPORT OF FATAL ACCIDENT";
            subtitle = "Employer’s Report on Fatal Accidents";
            fileName = "Report_of_Fatal_Accident.pdf";
            break;
        case 3:
            title = "FORM C - AGREEMENT AS TO COMPENSATION";
            subtitle = "Agreement Between Employer and Workmen";
            fileName = "Agreement_as_to_Compensation.pdf";
            break;
        case 4:
            title = "FORM D - DEPOSIT OF COMPENSATION FOR FATAL ACCIDENT";
            subtitle = "Employer’s Deposit for Compensation";
            fileName = "Deposit_of_Compensation.pdf";
            break;
        case 5:
            title = "FORM E - RECEIPT FOR COMPENSATION";
            subtitle = "Official Receipt for Compensation Payment";
            fileName = "Receipt_for_Compensation.pdf";
            break;
        default:
            title = "WORKMEN'S COMPENSATION FORM";
            subtitle = "Generated Report Under Workmen’s Compensation Act, 1923";
            fileName = "Workmen_Compensation_Form_Report.pdf";
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

export default WorkmenCompensationFormPage;
