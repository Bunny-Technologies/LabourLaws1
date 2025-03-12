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
      { "name": "capture_velocities_design_vs_actual", "label": "Capture Velocities (Design vs Actual)", "type": "text", "required": true },


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
        { "name": "serial_number_in_register", "label": "Serial Number in the Register of Adult Workers", "type": "number", "required": true },
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
  
    let validationErrors = {};
  
    // ✅ Validate all required fields before submission
    formFields[form.id]?.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = "This field is required.";
      }
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
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
  
  
  // ✅ Handle PDF Generation

const handleDownloadPDF = () => {
  if (!submitted) return;

  const doc = new jsPDF({ orientation: "portrait" }); // Use Portrait format for Form 26A
  doc.setFont("times", "bold");
  doc.setFontSize(16);

  let title = "";
  let subtitle = "";
  let sectionTitle = "";
  let fileName = "";
  let y = 20;
  const pageHeight = doc.internal.pageSize.height - 20; // Adjust for margins

  const checkPageSpace = (increment) => {
    if (y + increment > pageHeight) {
        doc.addPage();
        y = 20; // Reset Y for new page
    }
   };

// ✅ Define Titles, Section Titles & Filenames based on Form ID
switch (form.id) {
  case 1:
      title = "FORM NO. 26-A";
      subtitle = "(Prescribed under Rule 102)";
      sectionTitle = "TEST REPORT: DUST/FUME- EXTRACTION SYSTEM";
      fileName = "Dust_Fume_Extraction_System_Report.pdf";
      break;
      case 2: // FORM 29 - Register of Accidents
      title = "FORM NO. 29";
      subtitle = "(Prescribed under Rule 111)";
      sectionTitle = "REGISTER OF ACCIDENTS, MAJOR ACCIDENTS, AND DANGEROUS OCCURRENCES";
      fileName = "Register_of_Accidents.pdf";
      break;
  case 3: // FORM 33 - Certificate of Fitness
      title = "FORM NO. 33";
      subtitle = "(Prescribed under Rule 68-T and 102)";
      sectionTitle = "CERTIFICATE OF FITNESS FOR EMPLOYMENT IN HAZARDOUS PROCESSES";
      fileName = "Certificate_of_Fitness.pdf";
      break;
  default:
      title = "FACTORY FORM";
      subtitle = "Generated Report";
      fileName = "Factory_Form_Report.pdf";
      break;
  }

  // ✅ Add Title & Formatting
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(title, 105, y, null, null, "center");

  y += 6;
  doc.setFontSize(10);
  doc.text(subtitle, 105, y, null, null, "center");

  y += 10;
  doc.setFontSize(10);
  doc.text(sectionTitle, 105, y, null, null, "center");

  y += 15;
  doc.setFontSize(12);
  doc.setFont("times", "normal");

  // ✅ Section 1: General Details
  if (form.id == 1) {
      doc.setFont("times", "bold");
      doc.text("1. Description of System:", 20, y);
      doc.setFont("times", "normal");
      doc.text(formData["description_of_system"] || "N/A", 100, y);
      y += 10;

      checkPageSpace(20);

      // ✅ Section 2: Hood Details
      doc.setFont("times", "bold");
      doc.text("2. Hood:", 20, y);
      y += 8;
      
      const hoodDetails = [
          { label: "(a) Serial No. of Hood", key: "hood_serial_no" },
          { label: "(b) Contaminant Captured", key: "contaminant_captured" },
          { label: "(c) Capture velocities (at specified points)", key: "capture_velocities_design_vs_actual" },
          { label: "(d) Volume exhausted at hood", key: "volume_exhausted" },
          { label: "(e) Hood static pressure", key: "hood_static_pressure" }
      ];

      hoodDetails.forEach((field) => {
          checkPageSpace(10);
          doc.setFont("times", "bold");
          doc.text(field.label, 25, y);
          doc.setFont("times", "normal");
          doc.text(formData[field.key] || "N/A", 100, y);
          y += 8;
      });

      checkPageSpace(15);

      // ✅ Section 3: Pressure Drop
      doc.setFont("times", "bold");
      doc.text("3. Total pressure drop at joints:", 20, y);
      doc.setFont("times", "normal");
      doc.text(formData["pressure_drop_joints"] || "N/A", 100, y);
      y += 10;

      doc.setFont("times", "bold");
      doc.text("   Other points of system (to be specified):", 20, y);
      doc.setFont("times", "normal");
      doc.text(formData["pressure_drop_other"] || "N/A", 100, y);
      y += 8;

      checkPageSpace(15);

      // ✅ Section 4: Transport Velocity
      doc.setFont("times", "bold");
      doc.text("4. Transport velocity in Dust/Fume \n (at specified points):", 20, y);
      doc.setFont("times", "normal");
      doc.text(formData["transport_velocity"] || "N/A", 100, y);
      y += 12;

      checkPageSpace(15);

      // ✅ Section 5: Air Cleaning Device
      doc.setFont("times", "bold");
      doc.text("5. Air Cleaning Device:", 20, y);
      y += 8;

      const airCleaningDetails = [
          { label: "(a) Type used", key: "air_cleaning_type" },
          { label: "(b) Velocity at inlet", key: "air_cleaning_velocity_inlet" },
          { label: "(c) Static pressure at inlet", key: "air_cleaning_static_pressure" },
          { label: "(d) Velocity at outlet", key: "air_cleaning_velocity_outlet" }
      ];

      airCleaningDetails.forEach((field) => {
          checkPageSpace(10);
          doc.setFont("times", "bold");
          doc.text(field.label, 25, y);
          doc.setFont("times", "normal");
          doc.text(formData[field.key] || "N/A", 100, y);
          y += 8;
      });

      checkPageSpace(15);

      // ✅ Section 6: Fan Details
      doc.setFont("times", "bold");
      doc.text("6. Fan:", 20, y);
      y += 8;

      const fanDetails = [
          { label: "(a) Type used", key: "fan_type" },
          { label: "(b) Volume handled", key: "fan_volume_handled" },
          { label: "(c) Static pressures", key: "fan_static_pressure" },
          { label: "(d) Pressure drop at outlet of fan", key: "fan_pressure_drop_outlet" }
      ];

      fanDetails.forEach((field) => {
          checkPageSpace(10);
          doc.setFont("times", "bold");
          doc.text(field.label, 25, y);
          doc.setFont("times", "normal");
          doc.text(formData[field.key] || "N/A", 100, y);
          y += 8;
      });

      checkPageSpace(15);

      // ✅ Section 7: Fan Motor
      doc.setFont("times", "bold");
      doc.text("7. Fan Motor:", 20, y);
      y += 8;

      const fanMotorDetails = [
          { label: "(a) Type", key: "fan_motor_type" },
          { label: "(b) Speed and Horsepower", key: "fan_motor_speed_hp" }
      ];

      fanMotorDetails.forEach((field) => {
          checkPageSpace(10);
          doc.setFont("times", "bold");
          doc.text(field.label, 25, y);
          doc.setFont("times", "normal");
          doc.text(formData[field.key] || "N/A", 100, y);
          y += 8;
      });

      checkPageSpace(15);

      // ✅ Section 8: Defects Observed
      doc.setFont("times", "bold");
      doc.text("8. Particulars of Defects Observed:", 20, y);
      doc.setFont("times", "normal");
      doc.text(formData["defects_observed"] || "N/A", 100, y);
      y += 15;

      checkPageSpace(30);

      // ✅ Certification Section
      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text("I, certify that on this ………………….. day of ……………the above dust/fume extraction system was thoroughly", 20, y);
      doc.text("examined.I further certify that on said date, I examined the system, and this is a true report of my examination", 20, y + 6);

      y += 30;
      doc.setTextColor(0, 0, 0);
      doc.setFont("times", "normal");
      doc.text("Signature        : ", 140, y);
      y+=10;
      doc.text("Qualification  : ", 140, y);

      y += 10;
      doc.setFont("times", "normal");
      doc.text("Address          : ", 140, y);
      y += 10;
      doc.text("Date               : ", 140, y);
      y += 10;
      doc.text("If employed by a company or association give name and address.", 20, y + 6);
    }
  
  else if (form.id ==2) {
      // ✅ Define Table Structure
        let startX = 20;
        let startY = y+5;
        let cellWidth = [10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 25]; // Adjusted Column widths
        let rowHeight = 40; // Row height

        // ✅ Headers as in the provided document
        let headers = [
            "Serial Number",
            "Date & Time of Notice",
            "Name & Serial Number of the Person\nInvolved in  the register of \n adult/child register",
            "ESIC Insurance number.",
            "Date",
            "Time",
            "Place",
            "Cause of Accident / Major \nAccident / Dangerous Occurrence",
            "Nature of Injury / Dangerous Occurrence",
            "What exactly was the injured person,\nif any doing at that notice",
            "Name of Person Giving Notice",
            "Name, Address & \n Occupation of Two Witnesses",
            "Date of Return of Injured Person",
            "Number of days the injured person was absent\n from the work including holidays and off days",
            "Signature & Designation of Entry Maker"
        ];

        // ✅ Table Data
        let rowData = [
            [
                formData["serial_number"] || "N/A",
                formData["date_time_of_notice"] || "N/A",
                formData["person_name"] || "N/A",
                formData["esic_insurance_number"] || "N/A",
                formData["date"] || "N/A",
                formData["time"] || "N/A",
                formData["place"] || "N/A",
                formData["cause_of_accident"] || "N/A",
                formData["nature_of_injury"] || "N/A",
                formData["injured_person_action"] || "N/A",
                formData["notice_given_by"] || "N/A",
                formData["witness_name"] || "N/A",
                formData["return_date"] || "N/A",
                formData["days_absent"] || "N/A",
                formData["person_signature"] || "N/A",
            ],
        ];

        // ✅ Draw Table Headers
        doc.setFont("times", "bold");
        doc.setFontSize(9);
        let x = startX;

        // **Rotate Text for Vertical Headers**
        headers.forEach((header, i) => {
            doc.rect(x, startY, cellWidth[i], rowHeight * 2); // Draw Header Cell
            doc.saveGraphicsState();
            doc.saveGraphicsState();
            doc.saveGraphicsState();
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);

            // Rotate Text Manually
            doc.context2d.save();
            doc.context2d.translate(x + cellWidth[i] / 2, startY + rowHeight *1.9);
            doc.context2d.rotate(-Math.PI / 2);
            doc.context2d.fillText(header, 0, 0);
            doc.context2d.restore();

            doc.restoreGraphicsState();


            x += cellWidth[i];
        });

        // ✅ Insert "Injury/Dangerous Occurrence" header in the merged cell
        doc.setFontSize(10);
        doc.text("Injury/Dangerous Occurrence", 
          startX + cellWidth.slice(0, 6).reduce((a, b) => a + b, 0) + 2, 
          startY + 5); // Adjusted position for better alignment
 

        // ✅ Draw the horizontal line below the "Injury/Dangerous Occurrence" header
        let headerLineY = startY + rowHeight - 30; // Position for the horizontal line just below the header text
        doc.setLineWidth(0.01); // Optional: set line width for the horizontal line
        doc.line(
          startX + cellWidth.slice(0, 6).reduce((a, b) => a + b, 0) + cellWidth.slice(6, 6).reduce((a, b) => a + b, 0), // X start position for column 7
          headerLineY, 
          startX + cellWidth.slice(0, 6).reduce((a, b) => a + b, 0) + cellWidth.slice(6, 11).reduce((a, b) => a + b, 0), // X end position for column 11
          headerLineY
      );

      // ✅ Draw Table Rows
      doc.setFont("times", "normal");  // Set normal font for data cells
      doc.setFontSize(9);  // Set font size to 9 for data cells
      let rowY = startY + rowHeight * 2; // Start row after headers

      rowData.forEach((row) => {
        x = startX;
        row.forEach((cell, i) => {
            // Set line width to a very thin value to keep borders without boldness
            doc.setLineWidth(0.05); // Thin line for borders, adjust as necessary
            doc.rect(x, rowY, cellWidth[i], rowHeight); // Draw cell border
    
            // Rotate text in data cells
            doc.setFont("times", "normal");
            doc.setFontSize(9); 
            doc.context2d.save();
            doc.context2d.translate(x + cellWidth[i] / 2, rowY + rowHeight / 2);
            doc.context2d.rotate(-Math.PI / 2);
            doc.context2d.fillText(String(cell), 0, 0);
            doc.context2d.restore();
    
            x += cellWidth[i];
        });
        rowY += rowHeight;
    });
    
    }


  else if (form.id == 3) {
   
    //y += 1;
    doc.setFontSize(11);
    doc.text("(TO BE ISSUED BY FACTORY MEDICAL OFFICER)", 105, y, null, null, "center");

    y += 15;
    doc.setFont("times", "normal");
    doc.text("1. Serial number in the register of adult workers:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["serial_number_in_register"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("2. Name of the person examined:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["worker_name"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("3. Father’s Name:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["father_name"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("4. Sex:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["sex"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("5. Residence:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["residence"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("6. Date of birth (if available):", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["date_of_birth"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("7. Name & address of the factory:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["factory_name"] + ", " + formData["factory_address"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("8. The worker is employed/proposed:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["employment_status"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("(a) Hazardous process:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["hazardous_process"] || "N/A", 120, y);

    y += 8;
    doc.setFont("times", "normal");
    doc.text("(b) Dangerous operation:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["dangerous_operation"] || "N/A", 120, y);

    y += 15;
    doc.setFont("times", "normal");
    doc.text("I certify that I have personally examined the above-named person whose identification marks ", 30, y);
    y += 6;
    doc.text("are ......... and who is desirous of being employed in the above-mentioned process/operation and that his,", 20, y);
    y += 6;
    doc.text("/her age as can be ascertained from my examination, is …………… years.", 20, y);

    y += 15;
    doc.setFont("times", "normal");
    doc.text("In my opinion he/she is fit for employment in the said manufacturing process/operation.", 30, y);

    y += 10;
    doc.text("In my opinion he/she is unfit for employment in the said manufacturing process/operation for ", 30, y);
    y += 6;
    doc.text("the reason ...........He/She is referred for further examination to the Certifying Surgeon.", 20, y);

    y += 10;
    doc.setFont("times", "normal");
    doc.text("The serial number of previous certificate is:", 20, y);
    doc.setFont("times", "normal");
    doc.text(formData["previous_certificate_number"] || "N/A", 120, y);

    y += 15;
    doc.setFont("times", "normal");
    doc.text("Signature or left-hand thumb\n impression of the person examined:", 20, y);
    doc.text("Signature of the Factory Medical Officer:", 100, y);

    y += 20;
    doc.text("Stamp of Factory\n Medical Officer with:", 140, y);
    
    y+= 15;
    doc.text("Name of the Factory:",140,y);

    y += 20;

    // 🟢 Check for page overflow before drawing the table
    if (y + 30 > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y = 20;
    }

    // 🟢 Draw Table for Certification Section with Proper Alignment
    let startX = 20;
    let rowHeight = 20;
    let colWidths = [35, 45, 35, 35];

    let headers = [
        "I certify that I examined the person mentioned above on (date of examination)",
        "I extend this certificate unfit (if certificate is not extended, the period for which the worker is considered unfit for work is to be mentioned)",
        "Signs and symptoms observed during examination",
        "Signature of the Factory Medical Officer with date"
    ];

    let headerY = y;
    let x = startX;
    headers.forEach((header, index) => {
        doc.rect(x, headerY, colWidths[index], rowHeight * 2);
        doc.text(doc.splitTextToSize(header, colWidths[index] - 5), x + 2, headerY + 5);
        x += colWidths[index];
    });

    y += rowHeight * 2;
    let rowY = y;
    let values = [
        formData["examination_date"] || "N/A",
        formData["certificate_extension"] || "N/A",
        formData["symptoms_observed"] || "N/A",
        formData["medical_officer_final_signature"] || "N/A"
    ];

    x = startX;
    values.forEach((value, index) => {
        doc.rect(x, rowY, colWidths[index], rowHeight);
        doc.text(doc.splitTextToSize(value, colWidths[index] - 5), x + 2, rowY + 6);
        x += colWidths[index];
    });

    y += rowHeight * 2 - 15;

    // 🟢 Check for page overflow before adding notes
    //if (y + 20 > doc.internal.pageSize.height - 20) {
        //doc.addPage();
        //y = 20;
    //}

    // 🟢 Notes Section
    doc.text("Notes:", 20, y);
    y += 5;
    doc.text("1. If declared unfit, reference should be made immediately to the Certifying Surgeon.", 30, y);
    y += 5;
    doc.text("2. Certifying Surgeon should communicate his findings to the occupier within 30 days of the receipt\n of this reference.", 30, y);
  }
     // ✅ Save PDF
  doc.save(fileName);
  alert("📥 Form Downloaded Successfully!");
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