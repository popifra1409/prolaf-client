import axios from "axios";

const DEPARTMENT_BASE_URL = "http://127.0.0.1:8000/hrm/departments/";

class DepartmentAPI {
  //list of departemts
  getDepartments = async () => {
    return await axios.get(DEPARTMENT_BASE_URL);
  };

  //add a new department
  addDepartment = async (department, departmentId) => {
    return await axios.post(
      DEPARTMENT_BASE_URL + departmentId + "/create/",
      department
    );
  };

  //update a department
  updateDepartment = async (department, departmentId) => {
    return await axios.put(
      DEPARTMENT_BASE_URL + departmentId + "/update/",
      department
    );
  };

  //get a single departement
  getDepartmentById = async (departmentId) => {
    return await axios.get(DEPARTMENT_BASE_URL + departmentId + "/");
  };

  //delete a departement
  deleteDepartment = async (departmentId) => {
    return await axios.delete(DEPARTMENT_BASE_URL + departmentId + "/delete/");
  };
}
export default new DepartmentAPI();
