import { Routes, Route } from "react-router-dom";
import Signup from "./Components/admin/Signup";
import Login from "./Components/admin/Login";
import AdminHome from "./Components/admin/AdminHome";
import MainHome from "./Components/user/MainHome";
import UserLogin from "./Components/user/login/Login";
import UserSignup from "./Components/user/signup/Signup";
import MaxWidthDialog from "./Components/user/Otp/OtpInput";
import AddBus from "./Components/admin/Addbus";
import ViewBus from  "./Components/admin/ViewBus";
import SuperAdminLogin from "./Components/super-admin/Login";
import SuperAdminHome from "./Components/super-admin/SuperAdminHome"
import { BrowserRouter } from "react-router-dom";
import Editbus from "./Components/admin/edit/Editbus";
import Test from "../src/Components/Test"
import { ConfirmProvider } from "material-ui-confirm";
import ManageCompanies from "./Components/super-admin/manage_companies/Companies";
import Displaybus from "./Components/super-admin/viewbuses/Displaybuses";
function App() {

  return (
 
    <BrowserRouter>
      <ConfirmProvider>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/otp" element={<MaxWidthDialog />} />
        <Route path="/admin/addbus" element={<AddBus />} />
        <Route path="/admin/viewbus/:ownerId" element={<ViewBus />} />
        <Route path="/super/admin/login" element={<SuperAdminLogin/>}/>
        <Route path="/super/admin/home" element={<SuperAdminHome/>}/>
        <Route path="/super/admin/managecompanies" element={<ManageCompanies/>}/>
        <Route path="/admin/editbus/:busId" element={<Editbus/>}/>
        {/* <Route path="/test" element={<Test/>}/> */}
        <Route path="/super/admin/viewbuses/:ownerId" element={<Displaybus/>}/>
      </Routes>
      </ConfirmProvider>
      </BrowserRouter>
  );
}

export default App;
