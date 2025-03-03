import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FormPage.css";

const FormPage = () => {
  const { formName } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    employer: "",
    address: "",
    date: "",
  });

  useEffect(() => {
    console.log("🔍 Received formName:", formName);
  }, [formName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5005/api/submit-form", { formName, ...formData });
      alert("✅ Form submitted successfully!");
    } catch (error) {
      alert("❌ Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <h2>{formName ? formName.replace(/-/g, " ") : "Loading..."}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="employer" placeholder="Employer" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
