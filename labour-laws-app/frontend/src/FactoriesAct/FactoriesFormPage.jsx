import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./FactoriesFormPage.css";

const FactoriesFormPage = () => {
  const location = useLocation();
  const { form } = location.state || {};

  if (!form) {
    return <h2>No Form Selected</h2>;
  }

  // ✅ Form Structure
  const formFields = {
    1: [//dust and fume
      { "name": "description_of_system", "label": "Description of System", "type": "textarea", "required": true },
    
      { "name": "hood_serial_no", "label": "Hood Serial No.", "type": "text", "required": true },
      { "name": "contaminant_captured", "label": "Contaminant Captured", "type": "text", "required": true },
<<<<<<< HEAD
      { "name": "capture_velocities_design_vs_actual", "label": "Capture Velocities (Design vs Actual)", "type": "text", "required": true },


=======
      { "name": "capture_velocity", "label": "Capture Velocities (Design vs Actual)", "type": "text", "required": true },
>>>>>>> aa114a66a2562b1f3ad5fdac31505a42e90431b2
      { "name": "volume_exhausted", "label": "Volume Exhausted at Hood", "type": "number", "required": true },
      { "name": "hood_static_pressure", "label": "Hood Static Pressure", "type": "number", "required": true },
    
      { "name": "pressure_drop_joints", "label": "Total Pressure Drop at Joints", "type": "number", "required": true },
      { "name": "pressure_drop_other", "label": "Total Pressure Drop at Other Points", "type": "text", "required": true },
    
      { "name": "transport_velocity", "label": "Transport Velocity in Dust/Fume", "type": "number", "required": true },
    
      { "name": "air_cleaning_type", "label": "Air Cleaning Device Type", "type": "text", "required": true },
      { "name": "air_cleaning_velocity_inlet", "label": "Velocity at Inlet", "type": "number", "required": true },
      { "name": "air_cleaning_static_pressure", "label": "Static Pressure at Inlet", "type": "number", "required": true },
      { "name": "air_cleaning_velocity_outlet", "label": "Velocity at Outlet", "type": "number", "required": true },
    
      { "name": "fan_type", "label": "Fan Type", "type": "text", "required": true },
      { "name": "fan_volume_handled", "label": "Fan Volume Handled", "type": "number", "required": true },
      { "name": "fan_static_pressure", "label": "Fan Static Pressure", "type": "number", "required": true },
      { "name": "fan_pressure_drop_outlet", "label": "Pressure Drop at Outlet of Fan", "type": "number", "required": true },
    
      { "name": "fan_motor_type", "label": "Fan Motor Type", "type": "text", "required": true },
      { "name": "fan_motor_speed_hp", "label": "Fan Motor Speed and Horsepower", "type": "text", "required": true },
    
      { "name": "defects_observed", "label": "Particulars of Defects Observed", "type": "textarea", "required": false },
    
      { "name": "certifying_signature", "label": "Certifying Authority Signature", "type": "text", "required": true },
      { "name": "certifying_qualification", "label": "Certifying Authority Qualification", "type": "text", "required": true },
      { "name": "certifying_address", "label": "Certifying Authority Address", "type": "textarea", "required": true },
      { "name": "certification_date", "label": "Certification Date", "type": "date", "required": true },
    
      { "name": "company_name", "label": "Company/Association Name", "type": "text", "required": false },
      { "name": "company_address", "label": "Company/Association Address", "type": "textarea", "required": false }
    ],
    
    2: [ // Form 29 - Register of Accidents
      { "name": "serial_number", "label": "Serial Number", "type": "number", "required": true },
      { "name": "date_time_of_notice", "label": "Date & Time of Notice", "type": "datetime-local", "required": true },
      { "name": "person_name", "label": "Name of the Person Involved in the Register of Adult/Child Register", "type": "text", "required": true },
      { "name": "person_serial_number", "label": "Serial Number of the Person Involved in the Register of Adult/Child Register", "type": "text", "required": true },
      { "name": "esic_insurance_number", "label": "ESIC Insurance Number", "type": "text", "required": false },
      { "name": "date", "label": "Date", "type": "date", "required": true },
      { "name": "time", "label": "Time", "type": "time", "required": true },
      { "name": "place", "label": "Place", "type": "text", "required": true },
      { "name": "cause_of_accident", "label": "Cause of Accident/Major Accident/Dangerous Occurrence", "type": "textarea", "required": true },
      { "name": "nature_of_injury", "label": "Nature of Injury/Dangerous Occurrence", "type": "textarea", "required": true },
      { "name": "injured_person_action", "label": "What Exactly was the Injured Person, if Any, Doing at that Notice", "type": "textarea", "required": true },
      { "name": "notice_given_by", "label": "Name of the Person Giving the Notice", "type": "text", "required": true },
      { "name": "witness_name", "label": "Name of Two Witnesses", "type": "textarea", "required": true },
      { "name": "witness_address", "label": "Address of Two Witnesses", "type": "textarea", "required": true },
      { "name": "witness_occupation", "label": "Occupation of Two Witnesses", "type": "textarea", "required": true },
      { "name": "return_date", "label": "Date of Return of Injured Person to Work", "type": "date", "required": false },
      { "name": "days_absent", "label": "Number of Days the Injured Person was Absent from Work Including Holidays and Off Days", "type": "number", "required": true },
      { "name": "person_signature", "label": "Signature of the Person Who Makes the Entry with Date", "type": "text", "required": true },
      { "name": "person_designation", "label": "Designation of the Person Who Makes the Entry with Date", "type": "text", "required": true },
    ],
    3: [
<<<<<<< HEAD
        { "name": "serial_number_in_register", "label": "Serial Number in the Register of Adult Workers", "type": "number", "required": true },
=======
        { "name": "serial_number", "label": "Serial Number in the Register of Adult Workers", "type": "number", "required": true },
>>>>>>> aa114a66a2562b1f3ad5fdac31505a42e90431b2
        { "name": "worker_name", "label": "Name of the Person Examined", "type": "text", "required": true },
        { "name": "father_name", "label": "Father’s Name", "type": "text", "required": true },
        { "name": "sex", "label": "Sex", "type": "select", "required": true, "options": ["Male", "Female", "Other"] },
        { "name": "residence", "label": "Residence", "type": "textarea", "required": true },
        { "name": "date_of_birth", "label": "Date of Birth (if available)", "type": "date", "required": false },
        { "name": "factory_name", "label": "Name of the Factory", "type": "text", "required": true },
        { "name": "factory_address", "label": "Factory Address", "type": "textarea", "required": true },
        { "name": "employment_status", "label": "The Worker is Employed/Proposed", "type": "select", "required": true, "options": ["Employed", "Proposed"] },
        { "name": "hazardous_process", "label": "Hazardous Process", "type": "text", "required": false },
        { "name": "dangerous_operation", "label": "Dangerous Operation", "type": "text", "required": false },
        { "name": "identification_marks", "label": "Identification Marks", "type": "textarea", "required": false },
        { "name": "ascertained_age", "label": "Age as Ascertained from Examination", "type": "number", "required": true },
        { "name": "fitness_status", "label": "Fitness for Employment", "type": "select", "required": true, "options": ["Fit", "Unfit", "Referred for Further Examination"] },
        { "name": "reason_unfit", "label": "Reason for Being Unfit (if applicable)", "type": "textarea", "required": false },
        { "name": "referred_to_surgeon", "label": "Referred to Certifying Surgeon", "type": "select", "required": false, "options": ["Yes", "No"] },
        { "name": "previous_certificate_number", "label": "Serial Number of Previous Certificate", "type": "text", "required": false },
        { "name": "worker_signature", "label": "Signature or Left Hand Thumb Impression of the Person Examined", "type": "file", "required": false },
        { "name": "medical_officer_signature", "label": "Signature of the Factory Medical Officer", "type": "text", "required": true },
        { "name": "medical_officer_stamp", "label": "Stamp of Factory Medical Officer", "type": "file", "required": false },
        { "name": "examination_date", "label": "Date of Examination", "type": "date", "required": true },
        { "name": "certificate_extension", "label": "Certificate Extended", "type": "select", "required": false, "options": ["Extended", "Unfit", "Pending"] },
        { "name": "unfit_period", "label": "Period of Unfitness (if not extended)", "type": "text", "required": false },
        { "name": "symptoms_observed", "label": "Signs and Symptoms Observed During Examination", "type": "textarea", "required": false },
        { "name": "medical_officer_final_signature", "label": "Final Signature of the Factory Medical Officer with Date", "type": "text", "required": true }
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
      5: [ // Form 2 - Notice of Occupation
        { name: "factory_name", label: "Name of the Factory", type: "text", required: true },
        { name: "factory_address", label: "Factory Address", type: "text", required: true },
        { name: "owner_name", label: "Name of the Occupier (Owner)", type: "text", required: true },
        { name: "manager_name", label: "Name of the Manager", type: "text", required: true },
        { name: "nature_of_work", label: "Nature of Manufacturing Process", type: "text", required: true },
        { name: "no_of_workers", label: "Number of Workers", type: "number", required: true },
        { name: "date_of_commencement", label: "Date of Commencement", type: "date", required: true },
      ],
      6: [ // Form 3 - Register of Adult Workers
        { name: "worker_name", label: "Name of the Worker", type: "text", required: true },
        { name: "worker_father_name", label: "Father’s/Husband’s Name", type: "text", required: true },
        { name: "worker_dob", label: "Date of Birth", type: "date", required: true },
        { name: "worker_gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
        { name: "worker_qualification", label: "Educational Qualification", type: "text", required: false },
        { name: "worker_address", label: "Permanent Address", type: "text", required: true },
        { name: "worker_designation", label: "Designation", type: "text", required: true },
        { name: "worker_department", label: "Department", type: "text", required: true },
        { name: "worker_joining_date", label: "Date of Joining", type: "date", required: true },
        { name: "worker_shift", label: "Shift Assigned", type: "select", options: ["Day", "Night", "Rotational"], required: true },
        { name: "worker_signature", label: "Worker’s Signature", type: "file", required: false },
      ],
      7: [ // Form 4 - Register of Child Workers
        { name: "child_name", label: "Name of the Child Worker", type: "text", required: true },
        { name: "child_father_name", label: "Father’s/Husband’s Name", type: "text", required: true },
        { name: "child_dob", label: "Date of Birth", type: "date", required: true },
        { name: "child_age_proof", label: "Age Proof Document (Upload)", type: "file", required: true },
        { name: "child_gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
        { name: "child_address", label: "Permanent Address", type: "text", required: true },
        { name: "child_guardian_contact", label: "Guardian Contact Number", type: "text", required: true },
        { name: "child_nature_of_work", label: "Nature of Work Assigned", type: "text", required: true },
        { name: "child_working_hours", label: "Working Hours", type: "text", required: true },
        { name: "child_medical_fitness", label: "Medical Fitness Certificate (Upload)", type: "file", required: true },
        { name: "child_education_status", label: "Is the Child Attending School?", type: "select", options: ["Yes", "No"], required: true },
        { name: "child_signature", label: "Child’s Signature", type: "file", required: false },
      ],
      8: [ // Form 5 - Certificate of Fitness for Young Workers
        { name: "worker_name", label: "Name of Young Worker", type: "text", required: true },
        { name: "worker_father_name", label: "Father’s/Husband’s Name", type: "text", required: true },
        { name: "worker_dob", label: "Date of Birth", type: "date", required: true },
        { name: "worker_age_proof", label: "Age Proof Document (Upload)", type: "file", required: true },
        { name: "worker_gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
        { name: "worker_address", label: "Permanent Address", type: "text", required: true },
        { name: "worker_contact", label: "Guardian Contact Number", type: "text", required: true },
        { name: "worker_medical_exam_date", label: "Date of Medical Examination", type: "date", required: true },
        { name: "worker_medical_certificate", label: "Medical Fitness Certificate (Upload)", type: "file", required: true },
        { name: "worker_signature", label: "Worker’s Signature", type: "file", required: false },
        { name: "certified_by", label: "Certified By (Doctor’s Name)", type: "text", required: true },
        { name: "certification_date", label: "Date of Certification", type: "date", required: true },
      ],
      9: [
        { name: "employee_name", label: "Employee Name", type: "text", required: true },
        { name: "employee_id", label: "Employee ID/Code", type: "text", required: true },
        { name: "department", label: "Department", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "total_leaves_earned", label: "Total Leaves Earned", type: "number", required: true },
        { name: "leave_type", label: "Leave Type", type: "select", options: ["Casual Leave", "Sick Leave", "Earned Leave"], required: true },
        { name: "date_leave_applied", label: "Date of Leave Applied", type: "date", required: true },
        { name: "date_leave_approved", label: "Date of Leave Approved", type: "date", required: false }, 
        { name: "supervisor_name", label: "Supervisor/Manager Name", type: "text", required: true },
        { name: "entry_date", label: "Date of Entry", type: "date", required: true }
      ],
      10: [
        { name: "worker_name", label: "Worker Name", type: "text", required: true },
        { name: "worker_id", label: "Worker ID", type: "text", required: true },
        { name: "department", label: "Department", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "medical_exam_date", label: "Date of Medical Examination", type: "date", required: true },
        { name: "health_condition", label: "General Health Condition", type: "text", required: true },
        { name: "hazardous_exposure", label: "Exposure to Hazardous Substances", type: "text", required: false },  
        { name: "doctor_name", label: "Doctor/Examiner Name", type: "text", required: true },
        { name: "doctor_remarks", label: "Medical Remarks", type: "text", required: false },
        { name: "next_exam_date", label: "Next Scheduled Examination Date", type: "date", required: false }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
  
    let validationErrors = {};
  
    // ✅ Validate all required fields before submission
    formFields[form.id]?.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = "This field is required.";
      }
=======

    let validationErrors = {};

    // Validate all fields before submission
    formFields[form.id]?.forEach((field) => {
        const errorMsg = validateField(field.name, formData[field.name]);
        if (errorMsg) validationErrors[field.name] = errorMsg;
>>>>>>> aa114a66a2562b1f3ad5fdac31505a42e90431b2
    });

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
<<<<<<< HEAD
  
    try {
      console.log("📤 Sending Form Data to Backend...", formData);
  
      const response = await fetch(`http://localhost:5006/api/submit-form/factories_act/${form.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // ✅ Check if response is JSON
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
  
      console.log("✅ Form Submitted Successfully:", result);
      setSubmitted(true);
      alert("✅ Form 29 submitted successfully!");
  
    } catch (error) {
      console.error("❌ Form Submission Failed:", error.message);
      alert(`❌ Submission Failed: ${error.message}`);
    }
  };
  
  
=======

    // ✅ Simulating successful form submission without backend
    console.log("✅ Form submission simulated (No backend)");

    // ✅ Set submitted to true to enable download
    setSubmitted(true);

    // ✅ Show success alert only once
    if (!submitted) {
        alert("✅ Form submitted successfully!");
    }
};

>>>>>>> aa114a66a2562b1f3ad5fdac31505a42e90431b2
  // ✅ Handle PDF Generation
// ✅ Handle PDF Generation
const handleDownloadPDF = () => {
  if (!submitted) return;

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  let title = "";
  let title_line = "";
  let subtitle = "";
  let fileName = "";
  let y = 15; // Start position

  // ✅ Dynamic Title & File Name based on Form ID
  switch (form.id) {
      case 1: // FORM 26-A - Dust/Fume Extraction System Report
          title = "FORM NO. 26-A";
          title_line = "(Prescribed under Rule 102)";
          subtitle = "TEST REPORT: DUST/FUME- EXTRACTION SYSTEM";
          fileName = "Dust_Fume_Extraction_System_Report.pdf";
          break;
      case 2: // FORM 29 - Register of Accidents
          title = "FORM NO. 29 (Prescribed under Rule 111)";
          subtitle = "REGISTER OF ACCIDENTS, MAJOR ACCIDENTS, AND DANGEROUS OCCURRENCES";
          fileName = "Register_of_Accidents.pdf";
          break;
      case 3: // FORM 33 - Certificate of Fitness
          title = "FORM NO. 33 (Prescribed under Rule 68-T and 102)";
          subtitle = "CERTIFICATE OF FITNESS FOR EMPLOYMENT IN HAZARDOUS PROCESSES";
          fileName = "Certificate_of_Fitness.pdf";
          break;
      default:
          title = "FACTORY FORM";
          subtitle = "Generated Report";
          fileName = "Factory_Form_Report.pdf";
          break;
  }

  // ✅ Title & Subtitle
  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(title, 105, y, null, null, "center");  // Title

  y += 5; 
  doc.setFontSize(11);
  doc.text(title_line, 105, y, null, null, "center");  // Rule Reference

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(50);
  doc.text(subtitle, 105, y, null, null, "center");  // Subtitle

  // ✅ Table Layout for Form Data
  let yPosition = 60;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const lineSpacing = 8; // Space between rows

  // Fetch Fields Dynamically
  const formFieldsArray = formFields[form.id] || [];

  // ✅ Table Drawing - Label (left) | Value (right)
  formFieldsArray.forEach((field) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${field.label}:`, 20, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData[field.name] || "N/A"}`, 90, yPosition);
      yPosition += lineSpacing;
  });

  // ✅ Certification Footer
  yPosition += 15;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(50);
  doc.text(
      "I, certify that I have personally examined the details above and confirm the correctness of the report.",
      20,
      yPosition
  );

  yPosition += 10;
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Authorized Signature: ____________________", 20, yPosition);
  doc.text("Factory Inspector Name: ____________________", 110, yPosition);

  yPosition += 10;
  doc.setFont("helvetica", "normal");
  doc.text("Date of Report: ____________________", 20, yPosition);

  // ✅ Save the PDF
  doc.save(fileName);
  alert("📥 PDF Downloaded Successfully!");
};


  return (
<div className="factories-form-page">
  <h2>{form?.name}</h2>

  <form className="factories-form" onSubmit={handleSubmit}>
    <fieldset>
      <legend>Fill in the details</legend>

      <div className="form-grid">
        {formFields[form.id]?.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={field.name}>{field.label}:</label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              >
                <option value="">Select</option>
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
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

export default FactoriesFormPage;