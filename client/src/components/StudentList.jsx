import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
]);

const StudentList = () => {
  const [columnDefs] = useState([
    { field: "name", headerName: "Name", sortable: true },
    { field: "nim", headerName: "NIM", sortable: true },
    { field: "program", headerName: "Program", sortable: true },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params) => {
        switch (params.value) {
          case "hadir":
            return "Hadir";
          case "tidak hadir":
            return "Tidak Hadir";
          case "belum absent":
            return "Belum Absent";
          default:
            return "Unknown";
        }
      },
      sortable: true,
    },
  ]);

  const [rowData] = useState([
    {
      name: "John Doe",
      nim: "123456",
      program: "Computer Science",
      status: "hadir",
    },
    {
      name: "Jane Smith",
      nim: "789012",
      program: "Mathematics",
      status: "tidak hadir",
    },
    {
      name: "Michael Brown",
      nim: "345678",
      program: "Physics",
      status: "belum absent",
    },
    {
      name: "Emily White",
      nim: "901234",
      program: "Biology",
      status: "tidak hadir",
    },
  ]);

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
