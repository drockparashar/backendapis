import axios from "axios";
import dotenv from "dotenv";
import NodeCache from "node-cache";
dotenv.config();

const mycache = new NodeCache({ stdTTL: 900, checkperiod: 120 });

export default async function getData(req, res) {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: "No city found" });
  }

  const cachedKey = `weather:${city}`;
  const cachedData = mycache.get(cachedKey);

  if (cachedData) {
    console.log("Cache hit");
    res.status(200).json(cachedData);
  } else {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const weather = response.data;

      const data = [
        { label: "City", value: weather.location.name },
        { label: "Region", value: weather.location.region },
        { label: "Country", value: weather.location.country },
        { label: "Local Time", value: weather.location.localtime },
        { label: "Temperature (°C)", value: weather.current.temp_c },
        { label: "Feels Like (°C)", value: weather.current.feelslike_c },
        { label: "Condition", value: weather.current.condition.text },
        { label: "Humidity (%)", value: weather.current.humidity },
        { label: "Wind (kph)", value: weather.current.wind_kph },
        { label: "Wind Direction", value: weather.current.wind_dir },
        { label: "Pressure (mb)", value: weather.current.pressure_mb },
        { label: "Visibility (km)", value: weather.current.vis_km },
        { label: "UV Index", value: weather.current.uv },
        { label: "Cloud Cover (%)", value: weather.current.cloud },
      ];

      mycache.set(`weather:${city}`, data, 900);
      console.log("Data Cached successfully");
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: "Something went wrong", err });
    }
  }
  console.log(city, apiKey);
}
