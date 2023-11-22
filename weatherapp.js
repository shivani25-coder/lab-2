const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 8002;
const apiKey = "a19def8a46msh97d5c020478d57fp1b6333jsn14d11adab06d";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    const apiUrl = `https://open-weather13.p.rapidapi.com/city/${city}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    });

    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
