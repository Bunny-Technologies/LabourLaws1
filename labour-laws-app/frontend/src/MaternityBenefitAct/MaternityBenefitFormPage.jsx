import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./MaternityBenefitForm.css";

const MaternityBenefitFormPage = () => {
  const location = useLocation();
  const { form } = location.state || {};

  if (!form) {
    return <h2>No Form Selected</h2>;
  }

  // ✅ Form Structure
  const formFields = {
    1: [ 
      { name: "insured_woman_name", label: "Name of the Insured Woman", type: "text", required: true },
      { name: "insurance_no", label: "Insurance Number", type: "text", required: true },
      { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
      { name: "husband_father_name", label: "Husband/Father's Name", type: "text", required: true },
      { name: "present_address", label: "Present Address", type: "text", required: true },
      { name: "employer_name", label: "Name & Address of Employer", type: "text", required: true },
      { name: "employment_start_date", label: "Date of Joining", type: "date", required: true },
      { name: "expected_delivery_date", label: "Expected Date of Delivery", type: "date", required: true },
      { name: "leave_start_date", label: "Date from which Leave is Required", type: "date", required: true },
      { name: "leave_end_date", label: "Date up to which Leave is Required", type: "date", required: true },
      { name: "medical_certificate", label: "Upload Medical Certificate", type: "file", required: true },
      { name: "signature", label: "Signature or Thumb Impression of Applicant", type: "file", required: true },
      { name: "submission_date", label: "Date of Submission", type: "date", required: true }
  ],
    2:[
    { name: "applicant_name", label: "Name of Applicant", type: "text", required: true },
    { name: "insurance_no", label: "Insurance Number", type: "text", required: true },
    { name: "relation", label: "Relation (Wife/Daughter of)", type: "text", required: true },
    { name: "present_address", label: "Present Address", type: "textarea", required: true },
    { name: "employment_status", label: "Present / Last Employment", type: "text", required: true },
    { name: "date", label: "Date of Notice", type: "date", required: true },
    { name: "signature", label: "Signature / Thumb Impression", type: "text", required: true }
    ],
    3: [
      { name: "insured_woman_name", label: "Name of the Insured Woman", type: "text", required: true },
      { name: "insurance_no", label: "Insurance Number", type: "text", required: true },
      { name: "husband_father_name", label: "Husband/Father's Name", type: "text", required: true },
      { name: "present_address", label: "Present Address", type: "text", required: true },
      { name: "date_of_pregnancy_confirmation", label: "Date Pregnancy was Confirmed", type: "date", required: true },
      { name: "expected_delivery_date", label: "Expected Date of Delivery", type: "date", required: true },
      { name: "medical_officer_name", label: "Name of Medical Officer", type: "text", required: true },
      { name: "medical_officer_designation", label: "Designation of Medical Officer", type: "text", required: true },
      { name: "hospital_clinic_name", label: "Name & Address of Hospital/Clinic", type: "text", required: true },
      { name: "certification_date", label: "Date of Certification", type: "date", required: true },
      { name: "doctor_signature", label: "Doctor’s Signature & Seal", type: "file", required: true }
  ],
  4:[
    { name: "insured_woman_signature", label: "Signature or Thumb Impression of Insured Woman", type: "text", required: true },
    { name: "employer_code", label: "Employer's Code No.", type: "text", required: true },
    { name: "book_no", label: "Book No.", type: "text", required: true },
    { name: "dispensary_stamp", label: "Stamp of the Dispensary", type: "text", required: true },
    { name: "serial_no", label: "Serial No.", type: "text", required: true },
    { name: "insurance_no", label: "Insurance No.", type: "text", required: true },
    { name: "expected_confinement_date", label: "Expected Date of Confinement", type: "date", required: true },
    { name: "signature_midwife", label: "Signature of Midwife (if any)", type: "text", required: false },
    { name: "signature_insurance_officer", label: "Signature or Counter-Signature of Insurance Medical Officer", type: "text", required: true },
    { name: "remarks", label: "Any Other Remarks", type: "textarea", required: false }
  ],
  5:[
      { name: "applicant_name", label: "Name of the Applicant", type: "text", required: true },
      { name: "insurance_no", label: "Insurance Number", type: "text", required: true },
      { name: "father_husband_name", label: "Father’s/Husband’s Name", type: "text", required: true },
      { name: "sickness_declaration", label: "Declaration of Sickness/Temporary Disablement", type: "textarea", required: true },
      { name: "last_working_day", label: "Last Date Worked", type: "date", required: true },
      { name: "reason_for_leave", label: "Reason for Leave", type: "textarea", required: true },
      { name: "benefit_claimed", label: "Benefit Claimed (Cash/Bank Transfer)", type: "text", required: true },
      { name: "thumb_impression", label: "Signature/Thumb Impression", type: "text", required: true },
      { name: "local_office", label: "Local Office", type: "text", required: true },
      { name: "present_address", label: "Present Address (If Changed)", type: "text", required: false }
    ],
    7:[
      { name: "insured_woman_name", label: "Name of the Insured Woman", type: "text", required: true },
      { name: "insurance_no", label: "Insurance Number", type: "text", required: true },
      { name: "employer_name", label: "Name & Address of Employer", type: "text", required: true },
      { name: "hospital_name", label: "Name & Address of Hospital", type: "text", required: true },
      { name: "date_of_delivery", label: "Date of Delivery", type: "date", required: true },
      { name: "child_gender", label: "Gender of the Child", type: "select", options: ["Male", "Female", "Other"], required: true },
      { name: "", label: "Birth Weight of the Child (kg)", type: "number", required: true },
      { name: "doctor_name", label: "Name of the Attending Doctor", type: "text", required: true },
      { name: "medical_officer_signature", label: "Signature of Medical Officer", type: "text", required: true },
    ],
  
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

export default MaternityBenefitFormPage;
