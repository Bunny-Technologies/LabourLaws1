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
      { "name": "principal_employer_name", "label": "Name of Principal Employer", "type": "text", "required": true },
      { "name": "principal_employer_address", "label": "Address of Principal Employer", "type": "text", "required": true },
      { "name": "establishment_name", "label": "Name of Establishment", "type": "text", "required": true },
      { "name": "establishment_address", "label": "Address of Establishment", "type": "text", "required": true },
      { "name": "contractor_name", "label": "Name of Contractor", "type": "text", "required": true },
      { "name": "contractor_address", "label": "Address of Contractor", "type": "text", "required": true },
      { "name": "contract_nature", "label": "Nature of Work on Contract", "type": "text", "required": true },
      { "name": "contract_location", "label": "Location of Contract Work", "type": "text", "required": true },
      { "name": "contract_period_from", "label": "Contract Period From", "type": "date", "required": true },
      { "name": "contract_period_to", "label": "Contract Period To", "type": "date", "required": true },
      { "name": "max_workers", "label": "Maximum Number of Workmen Employed by Contractor", "type": "number", "required": true }
    ],
    
  2: [
    { "name": "contractor_name", "label": "Name of Contractor", "type": "text", "required": true },
    { "name": "contractor_address", "label": "Address of Contractor", "type": "text", "required": true },
    { "name": "establishment_name", "label": "Name of Establishment", "type": "text", "required": true },
    { "name": "establishment_address", "label": "Address of Establishment", "type": "text", "required": true },
    { "name": "work_nature", "label": "Nature of Work", "type": "text", "required": true },
    { "name": "work_location", "label": "Location of Work", "type": "text", "required": true },
    { "name": "principal_employer_name", "label": "Name of Principal Employer", "type": "text", "required": true },
    { "name": "principal_employer_address", "label": "Address of Principal Employer", "type": "text", "required": true },
    { "name": "serial_number", "label": "Serial Number", "type": "number", "required": true },
    { "name": "employee_name", "label": "Name of Employee", "type": "text", "required": true },
    { "name": "father_husband_name", "label": "Father's/Husband's Name", "type": "text", "required": true },
    { "name": "designation", "label": "Nature of Employment/Designation", "type": "text", "required": true },
    { "name": "wage_period", "label": "Wage Period and Wages Payable", "type": "text", "required": true },
    { "name": "advance_date", "label": "Date of Advance Given", "type": "date", "required": true },
    { "name": "advance_amount", "label": "Amount of Advance Given", "type": "number", "required": true },
    { "name": "advance_purpose", "label": "Purpose for which Advance was Made", "type": "text", "required": true },
    { "name": "installments_count", "label": "Number of Installments for Repayment", "type": "number", "required": true },
    { "name": "installment_repayment_details", "label": "Date and Amount of Each Installment Repaid", "type": "text", "required": true },
    { "name": "last_installment_date", "label": "Date of Last Installment Repaid", "type": "date", "required": true },
    { "name": "remarks", "label": "Remarks", "type": "textarea", "required": false }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
  
    // ✅ Validate fields before submitting
    formFields[form.id]?.forEach((field) => {
      const errorMsg = validateField(field.name, formData[field.name]);
      if (errorMsg) validationErrors[field.name] = errorMsg;
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setSubmitted(true);
  
    try {
      const response = await fetch(`http://localhost:5006/api/submit-form/contract_labour_act/${form.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });      

  
      const data = await response.json();
  
      if (response.ok) {
        alert("✅ Form submitted successfully!");
        console.log("📌 Server Response:", data);
      } else {
        alert(`❌ Submission Failed: ${data.error}`);
        console.error("❌ Error:", data.error);
      }
    } catch (error) {
      alert("❌ Network error! Please try again.");
      console.error("❌ Network Error:", error);
    }
  };
  
  

  // ✅ Handle PDF Generation
  const handleDownloadPDF = () => {
    if (!submitted) return;
  
    const doc = new jsPDF({ orientation: "landscape" }); // Landscape for wider tables
    doc.setFont("times", "bold");
    doc.setFontSize(16);
  
    let title = "";
    let subtitle = "";
    let sectionTitle = "";
    let fileName = "";
  
    // ✅ Define Titles, Section Titles & Filenames based on Form ID
    switch (form.id) {
        case 1:
            title = "FORM XII";
            subtitle = "(Sec Rule 74)";
            sectionTitle = "REGISTER OF CONTRACTORS";
            fileName = "Register_of_Contractors.pdf";
            break;
        case 2:
            title = "FORM XXII";
            subtitle = "(See Rule 78(1)(a)(ii))";
            sectionTitle = "REGISTER OF ADVANCES";
            fileName = "Register_of_Advances.pdf";
            break;
        default:
            title = "CONTRACT LABOUR FORM";
            subtitle = "Generated Report Under Contract Labour Act";
            sectionTitle = "Form Details";
            fileName = "Contract_Labour_Form_Report.pdf";
            break;
    }
  
    // ✅ Set Header Formatting
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(title, 148, 20, null, null, "center"); 
  
    doc.setFontSize(12);
    doc.text(subtitle, 148, 30, null, null, "center"); 
  
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(sectionTitle, 148, 40, null, null, "center"); // Ensure "REGISTER OF CONTRACTORS" is added
    doc.setFont("times", "normal");
  
    let y = 55; 
  
    // ✅ Add Top Section Fields Based on Form ID
    doc.setFont("times", "normal");
    doc.setFontSize(10);
  
    if (form.id === 1) {
        // **Form XII - Register of Contractors**
        doc.text("      Name and address of the principal employer:", 20, y);
        doc.text((formData["principal_employer_name"] || "N/A") + " and " + (formData["principal_employer_address"] || "N/A"), 100, y);
        y += 15;
        doc.text("      Name and address of the establishment:", 20, y);
        doc.text((formData["establishment_name"] || "N/A") + " and " + (formData["establishment_address"] || "N/A"), 100, y);
        y += 10;
    } else if (form.id === 2) {
        // **Form XXII - Register of Advances**
        doc.text("      Name and address of the contractor:", 20, y);
        doc.text((formData["contractor_name"] || "N/A") + " and " + (formData["contractor_address"] || "N/A"), 100, y);
        y += 10;
        doc.text("      Name and address of the establishment:", 20, y);
        doc.text((formData["establishment_name"] || "N/A") + " and " + (formData["establishment_address"] || "N/A"), 100, y);
        y += 10;
        doc.text("      Nature and location of work:", 20, y);
        doc.text((formData["work_nature"] || "N/A") + " and " + (formData["work_location"] || "N/A"), 100, y);
        y += 10;
        doc.text("      Name and address of the principal employer:", 20, y);
        doc.text((formData["principal_employer_name"] || "N/A") + " and " + (formData["principal_employer_address"] || "N/A"), 100, y);
        y += 15;
    }
  
    // ✅ Define Table Structure
    let startX = 20;
    let startY = y;
    let cellWidth = [15, 50, 40, 40, 30, 30, 30]; 
    let rowHeight = 10; 
  
    let headers = [];
    let rowData = [];
  
    if (form.id === 1) {
        // ✅ **Form XII - Register of Contractors**
        headers = ["Sr. No.", "Contractor Name", "Nature of Work", "Location", "Period From", "Period To", "Max Workers"];
        rowData.push([
            "1",
            formData["contractor_name"] || "N/A",
            formData["contract_nature"] || "N/A",
            formData["contract_location"] || "N/A",
            formData["contract_period_from"] || "N/A",
            formData["contract_period_to"] || "N/A",
            formData["max_workers"] || "N/A",
        ]);
    } else if (form.id === 2) {
        // ✅ **Form XXII - Register of Advances (First Table)**
        headers = ["Sr. No.", "Worker Name", "Father's/Husbands name", "Designation", "Wage Period", "Advance Given", "Purpose"];
        rowData.push([
            formData["serial_number"] || "N/A",
            formData["employee_name"] || "N/A",
            formData["father_husband_name"] || "N/A",
            formData["designation"] || "N/A",
            formData["wage_period"] || "N/A",
            formData["advance_amount"] || "N/A",
            formData["advance_purpose"] || "N/A",
        ]);
    }
  
    // ✅ Draw First Table
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    let x = startX;
  
    headers.forEach((header, i) => {
        doc.rect(x, startY, cellWidth[i], rowHeight);
        doc.text(header, x + 2, startY + 6); 
        x += cellWidth[i]; 
    });
  
    // ✅ Draw Table Rows
    doc.setFont("times", "normal");
    let rowY = startY + rowHeight;
  
    rowData.forEach((row) => {
        x = startX;
        row.forEach((cell, i) => {
            doc.rect(x, rowY, cellWidth[i], rowHeight);
            doc.text(String(cell), x + 2, rowY + 6);
            x += cellWidth[i];
        });
        rowY += rowHeight;
    });
  
    // ✅ **Second Table (Only for Form XXII)**
    if (form.id === 2) {
        let secondTableHeaders = [
            "No. of Installments",
            "Date & Amount of Each Installment",
            "Last Installment Date",
            "Remarks"
        ];
  
        let secondTableData = [
            [
                formData["installments_count"] || "N/A",
                formData["installment_repayment_details"] || "N/A",
                formData["last_installment_date"] || "N/A",
                formData["remarks"] || "N/A",
            ]
        ];
  
        let secondTableCellWidths = [40, 60, 50, 50];
  
        // ✅ Move down before drawing second table
        rowY += 15;
  
        // ✅ Draw Second Table Headers
        x = startX;
        secondTableHeaders.forEach((header, i) => {
            doc.rect(x, rowY, secondTableCellWidths[i], rowHeight);
            doc.text(header, x + 2, rowY + 6);
            x += secondTableCellWidths[i];
        });
  
        // ✅ Draw Second Table Rows
        rowY += rowHeight;
        secondTableData.forEach((row) => {
            x = startX;
            row.forEach((cell, i) => {
                doc.rect(x, rowY, secondTableCellWidths[i], rowHeight);
                doc.text(String(cell), x + 2, rowY + 6);
                x += secondTableCellWidths[i];
            });
            rowY += rowHeight;
        });
    }
  
    // ✅ Save PDF
    doc.save(fileName);
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

export default ContractLabourFormPage;