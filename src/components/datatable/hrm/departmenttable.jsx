import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { departementColumns } from "../../../pages/hrm/department/departmenttablesource";
import DepartmentAPI from "../../../services/hrm/departmentAPI";

const DepartmentDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [departements, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  //deleting a record
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    setLoading(true);
    DepartmentAPI.getDepartments().then((res) => {
      setDepartments(res.data);
    });
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    setDepartments(departements.filter((item) => item.id !== id));
    try {
      const response = await DepartmentAPI.deleteDepartment(id);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/hrm/departments/${params.id}/`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              //onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        MANAGE DEPARTMENT
        <Link to="/hrm/departments/newdepartment" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={departements}
        columns={departementColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.departmentId}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
      />
    </div>
  );
};

export default DepartmentDatatable;
