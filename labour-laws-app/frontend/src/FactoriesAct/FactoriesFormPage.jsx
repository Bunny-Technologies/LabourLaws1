import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./FactoriesForm.css";

const FactoriesFormPage = () => {
  const location = useLocation();
  const { form } = location.state || {};

  if (!form) {
    return <h2>No Form Selected</h2>;
  }

  // ✅ Form Structure
  const formFields = {
    1: [
      { name: "system_description", label: "Description of System", type: "text", required: true },
      { name: "hood_serial", label: "Serial No. of Hood", type: "text", required: true },
      { name: "contaminant", label: "Contaminant Captured", type: "text", required: true },
      { name: "capture_velocity", label: "Capture Velocities (Design & Actual)", type: "text", required: true },
      { name: "volume_exhausted", label: "Volume Exhausted at Hood", type: "number", required: true },
      { name: "static_pressure", label: "Hood Static Pressure", type: "number", required: true },
      { name: "pressure_drop_joints", label: "Total Pressure Drop at Joints", type: "number", required: true },
      { name: "pressure_drop_system", label: "Total Pressure Drop at Other System Points", type: "number", required: true },
      { name: "transport_velocity", label: "Transport Velocity in Dust/Fume", type: "number", required: true },
      { name: "air_cleaning_device_type", label: "Air Cleaning Device - Type Used", type: "text", required: true },
      { name: "air_cleaning_velocity_inlet", label: "Air Cleaning Device - Velocity at Inlet", type: "number", required: true },
      { name: "air_cleaning_static_pressure", label: "Air Cleaning Device - Static Pressure at Inlet", type: "number", required: true },
      { name: "air_cleaning_velocity_outlet", label: "Air Cleaning Device - Velocity at Outlet", type: "number", required: true },
      { name: "fan_type", label: "Fan - Type Used", type: "text", required: true },
      { name: "fan_volume", label: "Fan - Volume Handled", type: "number", required: true },
      { name: "fan_static_pressure", label: "Fan - Static Pressures", type: "number", required: true },
      { name: "fan_pressure_drop", label: "Fan - Pressure Drop at Outlet", type: "number", required: true },
      { name: "fan_motor_type", label: "Fan Motor Type", type: "text", required: true },
      { name: "fan_motor_speed", label: "Fan Motor Speed & Horse Power", type: "text", required: true },
      { name: "defects", label: "Particulars of Defects (if any)", type: "text", required: false },
      { name: "examiner_name", label: "Examiner's Name", type: "text", required: true },
      { name: "qualification", label: "Examiner's Qualification", type: "text", required: true },
      { name: "address", label: "Examiner's Address", type: "text", required: true },
      { name: "date", label: "Date of Examination", type: "date", required: true },
    ],
    2: [ // Form 29 - Register of Accidents
        { name: "serial_number", label: "Serial Number", type: "number", required: true },
        { name: "date_time_notice", label: "Date & Time of Notice", type: "datetime-local", required: true },
        { name: "name_serial_person", label: "Name & Serial Number of Person Involved", type: "text", required: true },
        { name: "register_type", label: "Register Type (Adult/Child)", type: "text", required: true },
        { name: "esic_insurance_number", label: "ESIC Insurance Number", type: "text", required: true },
        { name: "date_of_injury", label: "Date of Injury/Dangerous Occurrence", type: "date", required: true },
        { name: "injury_occurrence", label: "Nature of Injury/Dangerous Occurrence", type: "text", required: true },
        { name: "cause_of_accident", label: "Cause of Accident/Major Accident/Dangerous Occurrence", type: "text", required: true },
        { name: "location", label: "Time & Place of Accident", type: "text", required: true },
        { name: "task_performed", label: "What the Injured Person was Doing at the Time", type: "text", required: true },
        { name: "person_notified", label: "Name of the Person Giving the Notice", type: "text", required: true },
        { name: "witness_1", label: "Witness 1 (Name, Address, Occupation)", type: "text", required: true },
        { name: "witness_2", label: "Witness 2 (Name, Address, Occupation)", type: "text", required: true },
        { name: "return_date", label: "Date of Return to Work", type: "date", required: false },
        { name: "absence_days", label: "Number of Days Absent (Including Holidays & Off Days)", type: "number", required: false },
        { name: "entry_person", label: "Signature & Designation of Person Making Entry", type: "text", required: true },
        { name: "entry_date", label: "Date of Entry", type: "date", required: true },
    ],
    3: [
        { name: "serial_number", label: "Serial Number in Register of Adult Workers", type: "text", required: true },
        { name: "worker_name", label: "Name of the Person Examined", type: "text", required: true },
        { name: "father_name", label: "Father’s Name", type: "text", required: true },
        { name: "sex", label: "Sex", type: "text", required: true },
        { name: "residence", label: "Residence", type: "text", required: true },
        { name: "dob", label: "Date of Birth (if available)", type: "date", required: false },
        { name: "factory_name", label: "Name & Address of the Factory", type: "text", required: true },
        { name: "employment_status", label: "The Worker is Employed/Proposed", type: "text", required: true },
        { name: "hazardous_process", label: "Hazardous Process", type: "text", required: true },
        { name: "dangerous_operation", label: "Dangerous Operation", type: "text", required: true },
        { name: "identification_marks", label: "Identification Marks", type: "text", required: true },
        { name: "ascertained_age", label: "Age Ascertained from Examination", type: "number", required: true },
        { name: "fitness_status", label: "Fit for Employment?", type: "radio", options: ["Fit", "Unfit"], required: true },
        { name: "unfitness_reason", label: "Reason for Unfitness (If Applicable)", type: "text", required: false },
        { name: "previous_certificate_serial", label: "Serial Number of Previous Certificate", type: "text", required: false },
        { name: "medical_officer_signature", label: "Factory Medical Officer Signature", type: "text", required: true },
        { name: "factory_stamp", label: "Stamp of Factory Medical Officer", type: "text", required: true },
        { name: "examination_date", label: "Date of Examination", type: "date", required: true },
        { name: "certifying_surgeon_reference", label: "Certifying Surgeon Reference (If Unfit)", type: "text", required: false },
        { name: "unfit_period", label: "Period Considered Unfit for Work", type: "text", required: false },
        { name: "symptoms_observed", label: "Signs & Symptoms Observed During Examination", type: "text", required: false },
    ],
    4: [
        { name: "factory_name", label: "Name of the Factory", type: "text", required: true },
        { name: "applicant_name", label: "Name of the Applicant", type: "text", required: true },
        { name: "applicant_address", label: "Address of the Applicant", type: "text", required: true },
        { name: "factory_address", label: "Address of the Factory", type: "text", required: true },
        { name: "land_area", label: "Total Land Area (sq. meters)", type: "number", required: true },
        { name: "building_area", label: "Total Building Area (sq. meters)", type: "number", required: true },
        { name: "expected_workers", label: "Expected No. of Workers", type: "number", required: true },
        { name: "power_load", label: "Proposed Power Load (in kW)", type: "number", required: true },
        { name: "hazardous_materials", label: "List of Hazardous Materials (if any)", type: "text", required: false },
        { name: "waste_disposal", label: "Waste Disposal Method", type: "text", required: true },
        { name: "ventilation", label: "Ventilation & Air Circulation Plan", type: "text", required: true },
        { name: "safety_measures", label: "Fire & Safety Measures", type: "text", required: true },
        { name: "building_plan", label: "Upload Factory Layout Plan", type: "file", required: true },
        { name: "approval_authority", label: "Approval Authority Name", type: "text", required: true },
        { name: "application_date", label: "Date of Application", type: "date", required: true },
      ],

  };
  

  // ✅ State for form data & errors
  const [formData, setFormData] = useState(
    formFields[form.id]?.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}) || {}
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Input Validation Function
  const validateField = (name, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "This field is required.";
    } else {
      switch (name) {
        case "capture_velocity":
        case "volume_exhausted":
        case "static_pressure":
        case "pressure_drop":
        case "transport_velocity":
          if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Must be a valid number.";
          break;
        case "examiner_name":
        case "qualification":
        case "address":
          if (!/^[a-zA-Z\s]+$/.test(value)) errorMsg = "Must contain only letters.";
          break;
        case "date":
          if (new Date(value) > new Date()) errorMsg = "Date cannot be in the future.";
          break;
        default:
          break;
      }
    }
    return errorMsg;
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate as user types
    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate all fields
    formFields[form.id]?.forEach((field) => {
      const errorMsg = validateField(field.name, formData[field.name]);
      if (errorMsg) validationErrors[field.name] = errorMsg;
    });

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      alert("Form submitted successfully! Now you can download the PDF.");
    } else {
      setErrors(validationErrors);
    }
  };

  // ✅ Handle PDF Generation
  const handleDownloadPDF = () => {
    if (!submitted) return;
    
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    doc.text("FORM NO. 26-A", 80, 20);
    doc.text("(Prescribed under Rule 102)", 70, 30);
    doc.text("TEST REPORT : DUST/FUME- EXTRACTION SYSTEM", 50, 40);

    let y = 60;
    formFields[form.id]?.forEach((field) => {
      doc.text(`${field.label}: ${formData[field.name] || "N/A"}`, 20, y);
      y += 10;
    });

    doc.save("Dust_Fume_Report.pdf");
  };

  return (
    <div className="factories-form-page">
      <h2>{form?.name}</h2>


      <form
        className="factories-form"
        onSubmit={handleSubmit}
        style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }}
      >
        {formFields[form.id]?.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}:</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
            {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="form-buttons">
          <button type="submit" className="submit-btn">✅ Submit</button>
          {submitted && (
            <button onClick={handleDownloadPDF} className="download-btn">📥 Download PDF</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FactoriesFormPage;
