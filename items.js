const express = require("express");
const router = express.Router();

// Dummy data - Replace this with a database or actual data source
const items = [
  { id: 1, name: "Maarten" },
  { id: 2, name: "Barbara" },
  { id: 3, name: "Albert" },
];

// Route to get all items
router.get("/", (req, res) => {
  res.json(items);
});

module.exports = router;
