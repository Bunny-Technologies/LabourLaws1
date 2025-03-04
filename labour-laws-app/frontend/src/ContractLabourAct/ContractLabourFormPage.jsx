import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./ContractLabourForm.css";

const ContractLabourFormPage = () => {
  const location = useLocation();
  const { form } = location.state || {};

  if (!form) {
    return <h2>No Form Selected</h2>;
  }

  // ✅ Form Structure
  const formFields = {
    1: [
      { name: "principal_employer_name", label: "Name of the Principal Employer", type: "text", required: true },
      { name: "establishment_name", label: "Name of the Establishment", type: "text", required: true },
      { name: "contractor_name", label: "Name of Contractor", type: "text", required: true },
      { name: "nature_of_work", label: "Nature of Work on Contract", type: "text", required: true },
      { name: "contract_location", label: "Location of Contract Work", type: "text", required: true },
      { name: "contract_start_date", label: "Contract Start Date", type: "date", required: true },
      { name: "contract_end_date", label: "Contract End Date", type: "date", required: true },
      { name: "max_workers", label: "Maximum No of Workmen Employed by Contractor", type: "number", required: true }
  ],
  2: [ 
    { name: "contractor_name", label: "Name and Address of Contractor", type: "text", required: true },
    { name: "establishment_name", label: "Name and Address of Establishment", type: "text", required: true },
    { name: "nature_of_work", label: "Nature and Location of Work", type: "text", required: true },
    { name: "principal_employer_name", label: "Name and Address of Principal Employer", type: "text", required: true },
    { name: "serial_number", label: "Serial Number", type: "number", required: true },
    { name: "worker_name", label: "Name of Worker", type: "text", required: true },
    { name: "father_husband_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "employment_designation", label: "Nature of Employment/Designation", type: "text", required: true },
    { name: "wage_period", label: "Wage Period and Wages Payable", type: "text", required: true },
    { name: "advance_date_amount", label: "Date and Amount of Advance Given", type: "text", required: true },
    { name: "advance_purpose", label: "Purpose(s) for Which Advance Made", type: "text", required: true },
    { name: "repayment_installments", label: "Number of Installments for Repayment", type: "number", required: true },
    { name: "installment_details", label: "Date and Amount of Each Installment Repaid", type: "text", required: true },
    { name: "last_installment_date", label: "Date on Which Last Installment Was Repaid", type: "date", required: true },
    { name: "remarks", label: "Remarks", type: "textarea", required: false }
  ],
  3: [ 
    { name: "contractor_name", label: "Name and Address of Contractor", type: "text", required: true },
    { name: "workman_name", label: "Name of Workman", type: "text", required: true },
    { name: "father_husband_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "age_gender", label: "Age and Gender", type: "text", required: true },
    { name: "date_employment_started", label: "Date of Employment Started", type: "date", required: true },
    { name: "designation", label: "Designation/Nature of Work", type: "text", required: true },
    { name: "wage_rate", label: "Rate of Wages (Per Day/Month)", type: "number", required: true },
    { name: "remarks", label: "Remarks", type: "textarea", required: false }
  ],
  4: [ 
    { name: "workman_name", label: "Name of the Workman", type: "text", required: true },
    { name: "father_husband_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
    { name: "contractor_name", label: "Name & Address of Contractor", type: "text", required: true },
    { name: "nature_of_work", label: "Nature of Work", type: "text", required: true },
    { name: "date_of_employment", label: "Date of Employment", type: "date", required: true },
    { name: "wage_rate", label: "Rate of Wages (Per Day/Month)", type: "number", required: true },
    { name: "remarks", label: "Remarks (If Any)", type: "textarea", required: false }
  ],
  5: [
    { name: "employee_name", label: "Name of the Employee", type: "text", required: true },
    { name: "father_husband_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "designation", label: "Designation", type: "text", required: true },
    { name: "contractor_name", label: "Name & Address of Contractor", type: "text", required: true },
    { name: "employment_period", label: "Period of Employment (From - To)", type: "text", required: true },
    { name: "reason_for_leaving", label: "Reason for Leaving", type: "text", required: false },
    { name: "last_wage_drawn", label: "Last Wage Drawn", type: "number", required: true },
    { name: "remarks", label: "Remarks (If Any)", type: "textarea", required: false }
  ],
  8: [
    { name: "worker_name", label: "Name of the Worker", type: "text", required: true },
    { name: "worker_father_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "designation", label: "Designation/Department", type: "text", required: true },
    { name: "date_of_deduction", label: "Date of Deduction", type: "date", required: true },
    { name: "reason_for_deduction", label: "Reason for Deduction", type: "textarea", required: true },
    { name: "deduction_amount", label: "Amount Deducted (INR)", type: "number", required: true },
    { name: "witness_name", label: "Witness Name (If Any)", type: "text", required: false },
    { name: "remarks", label: "Remarks (If Any)", type: "textarea", required: false }
  ],
  9: [
    { name: "worker_name", label: "Name of the Worker", type: "text", required: true },
    { name: "worker_father_name", label: "Father’s/Husband’s Name", type: "text", required: true },
    { name: "designation", label: "Designation/Department", type: "text", required: true },
    { name: "date_of_fine", label: "Date of Fine", type: "date", required: true },
    { name: "reason_for_fine", label: "Reason for Fine", type: "textarea", required: true },
    { name: "fine_amount", label: "Fine Amount (INR)", type: "number", required: true },
    { name: "approval_authority", label: "Approved By (Manager/Supervisor)", type: "text", required: true },
    { name: "remarks", label: "Remarks (If Any)", type: "textarea", required: false }
  ],
  10: [
    { name: "worker_name", label: "Name of the Worker", type: "text", required: true },
    { name: "worker_id", label: "Worker ID/Employee Code", type: "text", required: true },
    { name: "designation", label: "Designation/Department", type: "text", required: true },
    { name: "date", label: "Date of Overtime", type: "date", required: true },
    { name: "start_time", label: "Overtime Start Time", type: "time", required: true },
    { name: "end_time", label: "Overtime End Time", type: "time", required: true },
    { name: "total_hours", label: "Total Overtime Hours", type: "number", required: true },
    { name: "approved_by", label: "Approved By (Manager/Supervisor)", type: "text", required: true }
  ]

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

    // Define form-specific titles and filenames for Contract Labour Act forms
    switch (form.id) {
        case 1:
            title = "FORM XII - REGISTER OF CONTRACTORS";
            subtitle = "Contractor Details Under Contract Labour Act, 1970";
            fileName = "Register_of_Contractors.pdf";
            break;
        case 2:
            title = "FORM XXII - REGISTER OF ADVANCES";
            subtitle = "Advance Payments to Workmen Under Contract Labour Act, 1970";
            fileName = "Register_of_Advances.pdf";
            break;
        case 3:
            title = "FORM XIII - REGISTER OF WORKMEN EMPLOYED BY CONTRACTOR";
            subtitle = "Details of Workmen Employed By Contractors";
            fileName = "Register_of_Workmen_Employed.pdf";
            break;
        case 4:
            title = "FORM XIV - EMPLOYMENT CARD";
            subtitle = "Issued to Workmen Under Contract Labour Act, 1970";
            fileName = "Employment_Card.pdf";
            break;
        case 5:
            title = "FORM XV - SERVICE CERTIFICATE";
            subtitle = "Certificate Issued to Employees";
            fileName = "Service_Certificate.pdf";
            break;
        case 6:
            title = "FORM XVI - MUSTER ROLL";
            subtitle = "Attendance Register of Workers";
            fileName = "Muster_Roll.pdf";
            break;
        case 7:
            title = "FORM XVII - REGISTER OF WAGES";
            subtitle = "Details of Wages Paid to Workers";
            fileName = "Register_of_Wages.pdf";
            break;
        case 8:
            title = "FORM XVIII - REGISTER OF DEDUCTIONS FOR DAMAGE OR LOSS";
            subtitle = "Records of Worker Deductions for Damage or Loss";
            fileName = "Register_of_Deductions.pdf";
            break;
        case 9:
            title = "FORM XIX - REGISTER OF FINES";
            subtitle = "Fines Imposed on Workmen";
            fileName = "Register_of_Fines.pdf";
            break;
        case 10:
            title = "FORM XX - REGISTER OF ADVANCES";
            subtitle = "Records of Advances Given to Workers";
            fileName = "Register_of_Advances.pdf";
            break;
        case 11:
            title = "FORM XXI - REGISTER OF OVERTIME";
            subtitle = "Details of Overtime Hours & Wages Paid";
            fileName = "Register_of_Overtime.pdf";
            break;
        case 12:
            title = "FORM XXIII - WAGE SLIP";
            subtitle = "Worker's Salary/Wage Slip Record";
            fileName = "Wage_Slip.pdf";
            break;
        case 13:
            title = "FORM XXIV - REGISTER OF EMPLOYMENT";
            subtitle = "Employment Register for Workmen";
            fileName = "Register_of_Employment.pdf";
            break;
        default:
            title = "CONTRACT LABOUR FORM";
            subtitle = "Generated Report Under Contract Labour Act";
            fileName = "Contract_Labour_Form_Report.pdf";
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

export default ContractLabourFormPage;
