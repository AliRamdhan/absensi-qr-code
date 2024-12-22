import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { BASE_URL } from "../common/constants";

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
]);

const StudentList = ({ users, absences }) => {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const populateData = async () => {
      try {
        const updatedRowData = users.map((user) => {
          const absence = absences.find((a) => a.userId === user.id);
          return {
            ...user,
            absenceStatus: absence ? "Hadir" : "Tidak Hadir",
          };
        });
        setRowData(updatedRowData);
      } catch (error) {
        console.error("Error fetching absences:", error.message);
      } finally {
        setLoading(false);
      }
    };

    populateData();
  }, [absences, users]);

  const [columnDefs] = useState([
    {
      field: "username",
      headerName: "Name",
      sortable: true,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <div className="line-clamp-3">{params.value || "user"}</div>
        </div>
      ),
    },
    {
      field: "nim",
      headerName: "NIM",
      sortable: true,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <div className="line-clamp-3">{params.value || "000000"}</div>
        </div>
      ),
    },
    {
      field: "program",
      headerName: "Program",
      sortable: true,
      cellRenderer: (params) => (
        <div className="flex items-center h-full">
          <div className="line-clamp-3">{params.value || "-"}</div>
        </div>
      ),
    },
    {
      field: "absenceStatus",
      headerName: "Status Absensi",
      sortable: true,
    },
  ]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div className="h-[300px]">
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          theme="alpine"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </div>
  );
};

export default StudentList;
