import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DepartmentAPI from "../../../services/hrm/departmentAPI";

const SingleDepartment = () => {
  const { departmentid } = useParams();

  const [department, setDepartment] = useState({
    departmentid: departmentid,
    dept_name: "",
    dept_description: "",
    dept_number: "",
    dept_parent: "",
    created_date: "",
    updated_date: "",
  });

  const[parentName, SetParentName] = useState({
    parent_name:""
  });

  useEffect(() => {
    DepartmentAPI.getDepartmentById(departmentid).then((res) => {
      let dpt = res.data;
      setDepartment({
        dept_name: dpt.dept_name,
        dept_description: dpt.dept_description,
        dept_number: dpt.dept_number,
        dept_parent: dpt.dept_parent,
        created_date: dpt.createDate,
        updated_date: dpt.updateDate,
      });
      let parentid = department.dept_parent;
      getDepartementName(parentid);
  }, [departmentid])});

  function getDepartementName(parentid){
      DepartmentAPI.getDepartmentById(parentid).then((resp) => {
        if(resp.data){
          let dptp = resp.data;
          SetParentName({
            parent_name: dptp.dept_name,
          });
        }
      
      })
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Department details:</h1>
            <div className="item">
              <div className="details">
                {/* <h1 className="itemTitle">Jane Doe</h1> */}
                <div className="detailItem">
                  <span className="itemKey">Departement Name:</span>
                  <span className="itemValue">{department.dept_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {department.dept_description}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone Number:</span>
                  <span className="itemValue">{department.dept_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Departement Parent:</span>
                  <span className="itemValue">{parentName.parent_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created Date:</span>
                  <span className="itemValue">{department.created_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Last modified Date:</span>
                  <span className="itemValue">{department.updated_date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <ListDepartment /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleDepartment;
