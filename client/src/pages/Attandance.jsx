import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLocationFromIpApi } from "../lib/location";
import { calculateDistance } from "../lib/distance";
import axios from "axios";
import { BASE_URL } from "../common/constants";

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    userId: "",
    classId: "",
    absenceDate: new Date().toISOString().split("T")[0],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [classDetails, setClassDetails] = useState(null);
  const [absences, setAbsences] = useState([]);
  const [hasRecordedAttendance, setHasRecordedAttendance] = useState(false);
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
    const fetchAbsences = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const classId = params.get("classId");
        const response = await axios.get(`${BASE_URL}/attend/class/${classId}`);
        console.log("Fetched all absences:", response.data);
        setAbsences(response.data);
      } catch (error) {
        console.error("Error fetching absences:", error.message);
      }
    };

    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const classId = params.get("classId");
        const response = await axios.get(`${BASE_URL}/class/${classId}`);
        console.log("Class details:", response.data);
        setClassDetails(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error.message);
      }
    };

    fetchData();
    fetchAbsences();
  }, [location]);

  useEffect(() => {
    if (!userLocation) return;

    const params = new URLSearchParams(location.search);
    const lat = parseFloat(params.get("lat"));
    const lon = parseFloat(params.get("lon"));
    const classId = Number(params.get("classId"));

    if (!lat || !lon) {
      setErrorMessage("Invalid QR code coordinates");
      return;
    }

    const token = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      userId: userData.id,
      classId: classId,
    }));

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
    console.log("user", userData.id);
    console.log("loc", classId);
    checkAbsence(userData.id, classId);
    setLocationVerified(true);
    setErrorMessage("");
  }, [location, navigate, userLocation]);

  const checkAbsence = (userId, classId) => {
    const userHasRecorded = absences.some(
      (absence) => absence.userId === userId && absence.classId === classId
    );
    console.log("usr", userHasRecorded);
    setHasRecordedAttendance(userHasRecorded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || submitSuccess || !locationVerified) return;

    try {
      setIsSubmitting(true);

      const response = await axios.post(`${BASE_URL}/attend`, formData);

      if (response.status === 201 || response.status === 200) {
        setSubmitSuccess(true);
        setErrorMessage("");
      } else {
        throw new Error("Failed to record attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to record attendance. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (errorMessage) {
    return (
      <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
        {classDetails && (
          <div className="w-full mb-10 md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-gray-400">
                {classDetails.namaKelas}
              </p>
            </div>
            <h2 className="font-sans text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-3xl md:mx-auto mb-1">
              {classDetails.mataKuliah}
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Dosen : {classDetails.namaDosen} - {classDetails.duration} Jam (
              {classDetails.startTime} - {classDetails.endTime} WIB)
            </p>
          </div>
        )}
        <div className="bg-red-100 border border-red-400 text-red-700 rounded p-4 mb-4">
          {errorMessage}
        </div>
        {/* {locationInfo && (
          <div className="bg-gray-100 p-4 rounded text-sm">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(locationInfo, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      {classDetails && (
        <div className="w-full mb-10 md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-gray-400">
              {classDetails.namaKelas}
            </p>
          </div>
          <h2 className="font-sans text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-3xl md:mx-auto mb-1">
            {classDetails.mataKuliah}
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Dosen : {classDetails.namaDosen} - {classDetails.duration} Jam (
            {classDetails.startTime} - {classDetails.endTime} WIB)
          </p>
        </div>
      )}
      {locationVerified && !hasRecordedAttendance && !submitSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {locationVerified ? (
            <div className="bg-green-100 border border-green-400 text-green-700 rounded p-4">
              Location Verified Successfully
            </div>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 rounded p-4">
              Verifying location...
            </div>
          )}

          <button
            type="submit"
            disabled={!locationVerified || isSubmitting || submitSuccess}
            className={`w-full py-2 px-4 rounded font-semibold ${
              locationVerified && !isSubmitting && !submitSuccess
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting
              ? "Recording Attendance..."
              : submitSuccess
              ? "Attendance Recorded ✓"
              : "Record Attendance"}
          </button>

          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 rounded p-4 mt-4">
              Attendance Recorded Successfully
            </div>
          )}

          {/* {locationInfo && (
            <div className="mt-4 bg-gray-100 p-4 rounded text-sm">
              <h3 className="font-bold mb-2">Location Details:</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(locationInfo, null, 2)}
              </pre>
            </div>
          )} */}
        </form>
      ) : hasRecordedAttendance ? (
        <div className="bg-yellow-100 border border-yellow-800 text-yellow-800 rounded p-4 mb-4">
          You have already recorded your attendance for this class.
        </div>
      ) : (
        <div className="bg-red-100 border border-red-800 text-red-800 rounded p-4 mb-4">
          Attendance not available or conditions not met.
        </div>
      )}
    </div>
  );
};

export default Attendance;
