import axios from "axios";

const DEPARTMENT_BASE_URL = "http://127.0.0.1:8000/hrm/departments/";

class DepartmentAPI {
  //list of departemts
  getDepartments = async () => {
    return await axios.get(DEPARTMENT_BASE_URL);
  };

  //add a new depart
  addDepartment = async (department) => {
    return await axios.post(DEPARTMENT_BASE_URL, department);
  };

  //get a single departement
  getDepartmentById = async (departmentId) => {
    return await axios.get(DEPARTMENT_BASE_URL + departmentId + "/");
  };
}
export default new DepartmentAPI();
