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
  
    // Validate all fields before submission
    formFields[form.id]?.forEach((field) => {
      const errorMsg = validateField(field.name, formData[field.name]);
      if (errorMsg) validationErrors[field.name] = errorMsg;
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5006/api/submit-form/${form.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("✅ Form submitted successfully!", result);
        alert("✅ Form submitted successfully!");
        setSubmitted(true);
      } else {
        console.error("❌ Form submission error:", result.error);
        alert("❌ Failed to submit form: " + result.error);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("❌ Network error. Please try again later.");
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

    switch (form.id) {
        case 1: // FORM 26-A - DUST/FUME EXTRACTION SYSTEM REPORT
            title = "FORM NO. 26-A";
            subtitle = "Test Report: Dust/Fume Extraction System";
            fileName = "Dust_Fume_Extraction_System_Report.pdf";

            doc.text(title, 105, 15, null, null, "center");
            doc.setFontSize(12);
            doc.text(subtitle, 105, 25, null, null, "center");

            let y26 = 40;
            const dustFumeFields = [
                "Description of system", "Serial No. of Hood", "Contaminant captured",
                "Capture Velocities (Design & Actual)", "Volume Exhausted at Hood",
                "Hood Static Pressure", "Total Pressure Drop at Joints", "Transport Velocity in Dust/Fume",
                "Air Cleaning Device Type", "Velocity at Inlet", "Fan Type Used",
                "Fan Volume Handled", "Fan Static Pressures", "Fan Motor Speed & Horse Power",
                "Defects (if any)", "Examiner's Name", "Qualification", "Address", "Date of Examination"
            ];

            dustFumeFields.forEach(field => {
                doc.text(`${field}: ${formData[field.toLowerCase().replace(/\s+/g, '_')] || "N/A"}`, 20, y26);
                y26 += 10;
            });

            doc.text("I certify that on this date, I thoroughly examined the system and confirm the details provided.", 20, y26 + 10);
            break;

        case 2: // FORM 29 - REGISTER OF ACCIDENTS
            title = "FORM NO. 29";
            subtitle = "Register of Accidents, Major Accidents, and Dangerous Occurrences";
            fileName = "Register_of_Accidents.pdf";

            doc.text(title, 105, 15, null, null, "center");
            doc.setFontSize(12);
            doc.text(subtitle, 105, 25, null, null, "center");

            let y29 = 40;
            const accidentFields = [
                "Serial Number", "Date & Time of Notice", "Name & Serial Number of Person",
                "Register Type (Adult/Child)", "ESIC Insurance Number", "Date of Injury",
                "Nature of Injury/Dangerous Occurrence", "Cause of Accident",
                "Time & Place of Accident", "Task at the Time", "Person Notified",
                "Witness 1", "Witness 2", "Return to Work Date", "Days Absent", "Entry Person", "Entry Date"
            ];

            accidentFields.forEach(field => {
                doc.text(`${field}: ${formData[field.toLowerCase().replace(/\s+/g, '_')] || "N/A"}`, 20, y29);
                y29 += 10;
            });

            doc.text("I certify that the above accident was reported correctly and necessary actions have been taken.", 20, y29 + 10);
            break;

        case 3: // FORM 33 - CERTIFICATE OF FITNESS
            title = "FORM NO. 33";
            subtitle = "Certificate of Fitness for Employment in Hazardous Processes";
            fileName = "Certificate_of_Fitness.pdf";

            doc.text(title, 105, 15, null, null, "center");
            doc.setFontSize(12);
            doc.text(subtitle, 105, 25, null, null, "center");

            let y33 = 40;
            const fitnessFields = [
                "Serial Number in Register of Adult Workers", "Name of Person Examined", "Father’s Name",
                "Sex", "Residence", "Date of Birth", "Factory Name & Address", "Employment Status",
                "Hazardous Process", "Dangerous Operation", "Identification Marks",
                "Age Ascertained", "Medical Officer Signature", "Factory Stamp",
                "Examination Date", "Certifying Surgeon Reference", "Unfit Period", "Symptoms Observed"
            ];

            fitnessFields.forEach(field => {
                doc.text(`${field}: ${formData[field.toLowerCase().replace(/\s+/g, '_')] || "N/A"}`, 20, y33);
                y33 += 10;
            });

            doc.text("This certificate is issued as per regulations under the Factories Act.", 20, y33 + 10);
            break;

        default:
            title = "FACTORY FORM";
            subtitle = "Generated Report";
            fileName = "Factory_Form_Report.pdf";
            doc.text(title, 105, 15, null, null, "center");
            doc.text(subtitle, 105, 25, null, null, "center");
            doc.text("No specific format found for this form.", 20, 40);
            break;
    }

    // Save the PDF
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

export default FactoriesFormPage;
