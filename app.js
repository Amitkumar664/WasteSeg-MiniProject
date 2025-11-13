// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const axios = require("axios");
const FormData = require("form-data");
const app = express();
const PORT = process.env.PORT || 5000;
const GRADIO_API = process.env.GRADIO_API;
// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Default route
app.get('/', (req, res) => {
  res.render("Main/index.ejs");
});
app.get('/learn',(req,res)=>{
  res.render("Learn/learn.ejs");
});

app.get('/ai',(req,res)=>{
  res.render("Main/ai.ejs");
});
app.get('/contact',(req,res)=>{
  res.render("Main/contact.ejs");
});

app.post("/identify-waste", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  try {
    const formData = new FormData();
    formData.append("data", req.file.buffer, { filename: "waste.jpg" });

    const response = await axios.post(GRADIO_API, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ result: response.data.data[0] });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "AI Service Error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
