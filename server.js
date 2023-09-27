// server.js
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const Datastore = require("nedb");

const dbContent = new Datastore({ filename: "database.db", autoload: true });

// Define routes and middleware here

const app = express();
const port = process.env.PORT || 3000;

const itemsRouter = require("./items"); // Change the path accordingly
// Use the items router (this is imported above)
app.use("/api/items", itemsRouter);

app.use(express.json());

// Use the CORS middleware with specific origin(s)
app.use(
  cors({
    origin: "*",
  })
);

// Define a route handler for /api/connect
app.get("/api/connect", (req, res) => {
  // Handle the API logic here
  res.json({ message: "Backend responded successfully!" });
});
// Define a route handler for retrieving all items from the database
app.get("/api/dbItems", (req, res) => {
  dbContent.find({}, (err, items) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(items);
    }
  });
});
// Define a route handler for posting new items to the database
app.post("/api/dbItems", (req, res) => {
  const newItem = req.body; // Assuming the request body contains the new item data

  dbContent.insert(newItem, (err, insertedItem) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(insertedItem); // Return the inserted item as a response
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
