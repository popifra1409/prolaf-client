import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DepartmentDatatable from "../../../components/datatable/hrm/departmenttable";

const ListDepartment = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DepartmentDatatable />
      </div>
    </div>
  );
};

export default ListDepartment;
