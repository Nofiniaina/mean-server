const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database.js");

dotenv.config();

const app = express();
const port = process.env.DB_PORT || 5000;

app.use(express.json());
app.use(cors());

database.connect();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

//Route
app.use("/user", require("./routes/userRoute"));
app.use('/stock', require('./routes/stockRoute.js'));
app.use('/appointment', require('./routes/appointmentRoute.js'));