import moment from "moment";

export const departementColumns = [
  {
    field: "departmentId",
    headerName: "ID",
    width: 100,
    cellClassName: "name-column--cell",
  },
  { field: "dept_name", headerName: "Name", width: 170 },
  {
    field: "dept_description",
    headerName: "Description",
    width: 220,
    editable: true,
  },
  {
    field: "dept_number",
    headerName: "Phone Number",
    headerAlign: "left",
    align: "right",
    width: 100,
  },
  {
    field: "dept_parent",
    headerName: "Parent",
    width: 170,
    cellClassName: "name-column--cell",
    type: "singleSelect",
    valueOptions: ({ row }) => {
      const options = [];
      /*  departments?.map((department) => options.push(department.dept_name));
      return options; */
    },
  },
  {
    field: "createDate",
    headerName: "Created At",
    width: 170,
    renderCell: (params) =>
      moment(params.row.createDate).format("YYYY-MM-DD HH-MM-SS"),
  },
];
