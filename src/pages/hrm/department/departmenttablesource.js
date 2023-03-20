import moment from "moment";

export const departementColumns = [
  {
    field: "departmentId",
    headerName: "DEPARTEMENT ID",
    width: 200,
    cellClassName: "name-column--cell",
  },
  { field: "dept_name", headerName: "DEPARTEMENT NAME", width: 300 },
  {
    field: "dept_description",
    headerName: "DESCRIPTION",
    width: 300,
    editable: true,
  },
  {
    field: "dept_number",
    headerName: "PHONE NUMBER",
    headerAlign: "left",
    align: "right",
    width: 150,
  },
];
