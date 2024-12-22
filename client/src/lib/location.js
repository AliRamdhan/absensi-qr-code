// // locationService.js
// import axios from "axios";

// export const getLocationFromIpApi = async () => {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return {
//       latitude: response.data.latitude,
//       longitude: response.data.longitude,
//       city: response.data.city,
//       accuracy: 1000, // IP geolocation typically has ~1km accuracy
//     };
//   } catch (error) {
//     console.error("Error fetching location from ipapi.co:", error);
//     throw new Error("Failed to get location from IP");
//   }
// };

// // locationService.js

export const getLocationFromIpApi = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(new Error("Failed to retrieve geolocation: " + error.message));
      }
    );
  });
};
