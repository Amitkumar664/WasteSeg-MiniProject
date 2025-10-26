// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
