import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import StudentList from "../components/StudentList";
import ModalQR from "../components/ModalQR";
import axios from "axios";
import { ATTANDANCE_URL, BASE_URL } from "../common/constants";
import { getLocationFromIpApi } from "../lib/location";

const ClassDetails = () => {
  const { id: classId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState(null);
  const [users, setUsers] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/class/${id}`);
        console.log(response.data);
        setClasses(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching class data:", error.message);
      }
    };

    const fetchAbsences = async (classId) => {
      try {
        const response = await axios.get(`${BASE_URL}/attend/class/${classId}`);
        console.log("Fetched absences:", response.data);
        setAbsences(response.data);
      } catch (error) {
        console.error("Error fetching absences:", error.message);
      }
    };

    fetchData(classId);
    fetchAbsences(classId);
  }, [classId]);

  useEffect(() => {
    // Calculate present and absent counts
    const calculateAttendance = () => {
      const present = users.filter((user) =>
        absences.some((absence) => absence.userId === user.id)
      ).length;
      const absent = users.length - present;

      setPresentCount(present);
      setAbsentCount(absent);
    };

    if (users.length > 0 && absences.length >= 0) {
      calculateAttendance();
    }
  }, [users, absences]);

  const generateQrCode = async () => {
    try {
      const location = await getLocationFromIpApi();
      const qrData = `${ATTANDANCE_URL}/attendance/form?lon=${location.longitude}&lat=${location.latitude}&classId=${classId}`;
      setQrUrl(qrData);
      setIsOpen(true);
    } catch (error) {
      setLocationError("Failed to get location. Please try again later.");
      console.error("Location error:", error);
    }
  };

  return (
    <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      {classes && (
        <>
          <div className="mb-8">
            <Link to={`/`}>
              <button className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-1 text-black transition-colors hover:bg-black focus:outline-none focus:ring active:bg-black">
                <span className="shrink-0 rounded-full border border-gray-900 bg-white p-1 group-active:border-gray-900">
                  <svg
                    className="size-5 rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <span className="font-medium transition-colors group-hover:text-white">
                  Back
                </span>
              </button>
            </Link>
          </div>
          <div className="w-full mb-10 md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-gray-400">
                {classes.namaKelas}
              </p>
            </div>
            <h2 className="font-sans text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-3xl md:mx-auto mb-1">
              {classes.mataKuliah}
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Dosen : {classes.namaDosen} - {classes.duration} Jam (
              {classes.startTime} - {classes.endTime} WIB)
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <StatsCard title="Present" count={presentCount} isPresent />
            <StatsCard title="Absent" count={absentCount} isAbsent />
            <StatsCard
              title="Total Students"
              count={users.length}
              isPresent={false}
              isAbsent={false}
            />
          </div>
          <p className="mx-auto mb-4 text-gray-600 sm:text-center lg:max-w-2xl lg:mb-6 md:px-16 mt-4">
            Statistik siswa kelas A - Matkul A
          </p>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={generateQrCode}
              className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-yellow-600 transition-colors hover:bg-yellow-600 focus:outline-none focus:ring active:bg-yellow-500"
            >
              <span className="font-medium transition-colors group-hover:text-white">
                Generate Code QR
              </span>

              <span className="shrink-0 rounded-full border border-yellow-600 bg-white p-2 group-active:border-yellow-500">
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>
          {isOpen && (
            <ModalQR setIsOpen={setIsOpen} isOpen={isOpen} qrData={qrUrl} />
          )}
          <div className="container py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
              Your Students
            </h1>

            <p className="mt-4 text-gray-500">List of students Class A</p>
            <StudentList users={users} absences={absences} />
          </div>
        </>
      )}
    </div>
  );
};

export default ClassDetails;
