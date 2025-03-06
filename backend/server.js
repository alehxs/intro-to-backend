const express = require("express");
const cors = require("cors");

const PORT = 3001;

const latitude = 30.2672;
const longitude = -97.7431;

const API_KEY = "3e8fc361bec22aa053fed770d9b13ab5";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

const app = express();
app.use(cors());

app.use("/weather", async (req, res) => {
  const response = await fetch(weatherUrl);
  const data = await response.json();

  res.send(data);
});

app.use("/", (req, res) => {
  res.send("Welcome to the server :)");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});