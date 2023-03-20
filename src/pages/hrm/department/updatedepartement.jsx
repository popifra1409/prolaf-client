import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentAPI from "../../../services/hrm/departmentAPI";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, TextField, useMediaQuery } from "@mui/material";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const UpdateDepartment = ({ title }) => {
  const { departmentid } = useParams();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  let navigate = useNavigate();

  //liste des départements pour la liste déroulante
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    DepartmentAPI.getDepartments().then((response) => {
      setDepartments(response.data);
    });
  }, []);

  //get department by ID
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DepartmentAPI.getDepartmentById(departmentid).then((response) => {
      setDepartment(response.data);
      setLoading(false);
    });
  }, [departmentid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    dept_name: department.dept_name,
    dept_description: department.dept_description,
    dept_number: department.dept_number,
    dept_parent: department.dept_parent,
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const departmentSchema = yup.object().shape({
    dept_name: yup.string().required("required"),
    dept_number: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await DepartmentAPI.updateDepartment(values, departmentid)
      .then((response) => {
        console.log("DATA: " + response.data);
        setSubmitting(true);
        resetForm();
        navigate("/hrm/departments");
      })
      .catch((error) => {
        console.error(error.response.data);
        setSubmitting(false);
      });
  };

  return (
    <div className="new" m="20px">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={departmentSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Department Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dept_name}
                      name="dept_name"
                      error={!!touched.dept_name && !!errors.dept_name}
                      helperText={touched.dept_name && errors.dept_name}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Téléphone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dept_number}
                      name="dept_number"
                      error={!!touched.dept_number && !!errors.dept_number}
                      helperText={touched.dept_number && errors.dept_number}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Decription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dept_description}
                      name="dept_description"
                      error={
                        !!touched.dept_description && !!errors.dept_description
                      }
                      helperText={
                        touched.dept_description && errors.dept_description
                      }
                      sx={{ gridColumn: "span 4" }}
                    />
                    <label htmlFor="departement">Departement parent</label>
                    <Field
                      name="dept_parent"
                      as="select"
                      onChange={handleChange}
                      className={`form-control ${
                        errors.dept_parent && touched.dept_parent
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      {({ field, form }) => (
                        <select {...field}>
                          <option value="" selected disabled>
                            Select a department
                          </option>
                          {departments.map((department) => (
                            <option
                              key={department.departmentId}
                              value={department.departmentId}
                            >
                              {department.dept_name}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="department"
                      className="invalid-feedback"
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      className="btn btn-primary"
                    >
                      Update Department
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default UpdateDepartment;

