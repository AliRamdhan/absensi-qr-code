// locationService.js
import axios from "axios";

export const getLocationFromIpApi = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return {
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      city: response.data.city,
      accuracy: 1000, // IP geolocation typically has ~1km accuracy
    };
  } catch (error) {
    console.error("Error fetching location from ipapi.co:", error);
    throw new Error("Failed to get location from IP");
  }
};
