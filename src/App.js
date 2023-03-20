import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ListDepartment from "./pages/hrm/department/departementlist";
import SingleDepartment from "./pages/hrm/department/singledepartement";
import NewDepartement from "./pages/hrm/department/newdepartement";
import UpdateDepartment from "./pages/hrm/department/updatedepartement";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}

          <Route path="hrm">
            {/* Human resources */}
            <Route path="departments">
              <Route index element={<ListDepartment />} />
              <Route path=":departmentid" element={<SingleDepartment />} />
              <Route
                path="newdepartment"
                element={<NewDepartement title="Add New Department" />}
              />
              <Route
                path="update/:departmentid"
                element={<UpdateDepartment title="Update Department" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
