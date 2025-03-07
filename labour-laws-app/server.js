require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Connect to MySQL Database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "lla_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "❌ Missing username or password" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "❌ Database error" });
    }

    if (results.length === 0 || password.trim() !== results[0].password.trim()) {
      return res.status(401).json({ error: "❌ Invalid username or password" });
    }

    console.log("✅ Login Successful for:", username);
    res.json({ message: "✅ Login successful", user: results[0] });
  });
});

// ✅ Get Forms by Department ID
app.get("/api/forms/:departmentId", (req, res) => {
  const departmentId = req.params.departmentId;

  const sql = "SELECT id, form_name FROM forms WHERE department_id = ?";
  db.query(sql, [departmentId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching forms:", err);
      return res.status(500).json({ error: "❌ Database error" });
    }

    res.json(results);
  });
});

// ✅ Get Forms by Department ID
app.get("/api/forms/:departmentId", (req, res) => {
  const departmentId = req.params.departmentId;

  const sql = "SELECT id, form_name FROM forms WHERE department_id = ?";
  db.query(sql, [departmentId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching forms:", err);
      return res.status(500).json({ error: "❌ Database error" });
    }

    res.json(results);
  });
});

// ✅ Mapping: Forms under Categories
const formTables = {
  factories_act: {
    1: "form_26a_dust_fume",
    2: "form_29_accidents",
    3: "form_33_certificate_fitness",
    4: "form_1_factory_permission",
    5: "form_2_notice_of_occupation",
    6: "form_3_register_adult_workers",
    7: "form_4_register_child_workers",
    8: "form_5_fitness_young_workers",
    9: "form_10_register_leave_wages",
    10: "form_11_health_register",
  },
  contract_labour_act: {
    1: "form_12_register_contractors",
    2: "form_13_register_employment",
    3: "form_14_register_overtime",
    4: "form_15_register_fines",
    5: "form_16_register_advances",
  },
};

// ✅ Submit Form Data
app.post("/api/submit-form/:category/:formId", (req, res) => {
  const { category, formId } = req.params;
  let formData = req.body;

  console.log("📥 Received Submission:", category, "-> Form ID:", formId);
  console.log("📌 Form Data:", JSON.stringify(formData, null, 2));

  // ✅ Validate Category & Form ID
  if (!formTables[category]) {
    return res.status(400).json({ error: "❌ Invalid category" });
  }
  const tableName = formTables[category][formId];
  if (!tableName) {
    return res.status(400).json({ error: "❌ Invalid form ID" });
  }

  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: "❌ No form data provided" });
  }

  // ✅ Fix Date Fields
  Object.keys(formData).forEach((key) => {
    if (key.includes("date") && formData[key]) {
      let parsedDate = new Date(formData[key]);
  
      // ✅ Ensure date is valid before formatting
      if (!isNaN(parsedDate.getTime())) {
        formData[key] = parsedDate.toISOString().split("T")[0]; 
      } else {
        console.error(`❌ Invalid date value received for ${key}:`, formData[key]);
        return res.status(400).json({ error: `❌ Invalid date value for ${key}` });
      }
    }
  });
  
  // ✅ Construct SQL Query Dynamically
  const columns = Object.keys(formData).join(", ");
  const placeholders = Object.keys(formData).map(() => "?").join(", ");
  const values = Object.values(formData);

  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  console.log("📌 SQL Query:", sql);
  console.log("📌 Values:", values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.sqlMessage);
      return res.status(500).json({ error: `❌ Database error: ${err.sqlMessage}` });
    }
    console.log(`✅ Data inserted in ${tableName}!`, result.insertId);
    res.json({ message: `✅ Form ${formId} submitted successfully!`, insertId: result.insertId });
  });
});

// ✅ Fetch Form Data
app.get("/api/form-data/:category/:formId", (req, res) => {
  const { category, formId } = req.params;

  if (!formTables[category]) {
    return res.status(400).json({ error: "❌ Invalid category" });
  }

  const tableName = formTables[category][formId];
  if (!tableName) {
    return res.status(400).json({ error: "❌ Invalid form ID" });
  }

  const sql = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(`❌ Error fetching data from ${tableName}:`, err);
      return res.status(500).json({ error: "❌ Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "❌ No data found" });
    }

    res.json(results[0]);
  });
});

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running! Use API endpoints like /api/login, /api/forms/:departmentId, /api/submit-form/:category/:formId, /api/form-data/:category/:formId");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
