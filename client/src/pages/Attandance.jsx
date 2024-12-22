import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLocationFromIpApi } from "../lib/location";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    console.error("Invalid coordinates:", { lat1, lon1, lat2, lon2 });
    return 0;
  }

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c;
  return distanceInKm * 1000;
};

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const ALLOWED_DISTANCE = 500;

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const location = await getLocationFromIpApi();
        setUserLocation(location);
      } catch (error) {
        console.error("Location error:", error);
        setErrorMessage(
          "Unable to retrieve your location. Please try again later."
        );
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const params = new URLSearchParams(location.search);
    const lat = parseFloat(params.get("lat"));
    const lon = parseFloat(params.get("lon"));
    const classId = params.get("classId");

    if (!lat || !lon) {
      setErrorMessage("Invalid QR code coordinates");
      return;
    }

    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      lat,
      lon
    );

    const locationDetails = {
      qrLocation: { lat, lon },
      userLocation: {
        lat: userLocation.latitude,
        lon: userLocation.longitude,
        city: userLocation.city,
      },
      accuracy: userLocation.accuracy,
      distance: Math.round(distance),
      allowedDistance: ALLOWED_DISTANCE,
    };

    console.log("Location comparison:", locationDetails);
    setLocationInfo(locationDetails);

    const adjustedDistance = Math.max(0, distance - userLocation.accuracy);

    if (adjustedDistance > ALLOWED_DISTANCE) {
      setErrorMessage(
        `Location verification failed. Distance: ${Math.round(
          distance
        )}m (Accuracy: ±${Math.round(userLocation.accuracy)}m)`
      );
      return;
    }

    if (!classId) {
      setErrorMessage("Class ID is missing.");
      return;
    }

    setErrorMessage("");
  }, [location, navigate, userLocation]);

  if (errorMessage) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 rounded p-4 mb-4">
          {errorMessage}
        </div>
        {locationInfo && (
          <div className="bg-gray-100 p-4 rounded text-sm">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(locationInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-green-100 border border-green-400 text-green-700 rounded p-4">
        Attendance Recorded Successfully
      </div>
      {locationInfo && (
        <div className="mt-4 bg-gray-100 p-4 rounded text-sm">
          <h3 className="font-bold mb-2">Location Details:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(locationInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Attendance;
