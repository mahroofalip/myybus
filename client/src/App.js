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
        <Route path="/admin/viewbus" element={<ViewBus />} />
        <Route path="/super/admin/login" element={<SuperAdminLogin/>}/>
        <Route path="/super/admin/home" element={<SuperAdminHome/>}/>
        <Route path="/admin/editbus/:busId" element={<Editbus/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
      </ConfirmProvider>
      </BrowserRouter>
  );
}

export default App;
