import { Routes, Route } from "react-router-dom";
import Signup from "./Components/admin/Signup";
import Login from "./Components/admin/Login";
import AdminHome from "./Components/admin/AdminHome";
import MainHome from "./Components/user/MainHome";
import UserLogin from "./Components/user/login/Login";
import UserSignup from "./Components/user/signup/Signup";
import MaxWidthDialog from "./Components/user/Otp/OtpInput";
import AddBus from "./Components/admin/Addbus";
import ViewBus from "./Components/admin/ViewBus";
import SuperAdminLogin from "./Components/super-admin/Login";
import SuperAdminHome from "./Components/super-admin/SuperAdminHome"
import { BrowserRouter } from "react-router-dom";
import Editbus from "./Components/admin/edit/Editbus";
import Test from "../src/Components/Test"
import { ConfirmProvider } from "material-ui-confirm";
import ManageCompanies from "./Components/super-admin/manage_companies/Companies";
import Displaybus from "./Components/super-admin/viewbuses/Displaybuses";
import Viewbusesuser from "./Components/user/viewbus/Viewbuseuser";
import Notfound from "./Components/user/viewbus/Notfound"
import Seats from "./Components/user/viewbus/buslayout/Seats"
import ManageUsers from "./Components/super-admin/manageUsers/Manageusers";
import Payment from "./Components/user/payment/Payment"
import ManageBooking from "./Components/user/managebooking/ManageBooking"
import UserProfie from "./Components/user/Profile/Profile";
import EditProfile from "../src/profile/EditProfile"
import Tripdetails from "./Components/admin/tripdetails/Tripdetails"
import SeatLayout from "./Components/admin/seatlayout/SeatLayout";
import AdminReport from "./Components/admin/report/Report";
import SuperAdminReport from "./Components/super-admin/report/SalesReport"
import LocalUsers from "./Components/super-admin/user/LocalUsers"
function App() {

  return (
    <BrowserRouter>
      <ConfirmProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/home/:owner_id" element={<AdminHome />} />
          <Route path="/" element={<MainHome />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otp" element={<MaxWidthDialog />} />
          <Route path="/admin/addbus" element={<AddBus />} />
          <Route path="/admin/viewbus/:ownerId" element={<ViewBus />} />
          <Route path="/super/admin/login" element={<SuperAdminLogin />} />
          <Route path="/super/admin/home" element={<SuperAdminHome />} />
          <Route path="/super/admin/managecompanies" element={<ManageCompanies />} />
          <Route path="/admin/editbus/:busId" element={<Editbus />} />
          <Route path="/admin/tripdetails/:busId" element={<Tripdetails />} />
          <Route path="/user/search/notfoud" element={<Notfound />} />
          <Route path="/test" element={<Test />} />
          <Route path="/super/admin/viewbuses/:ownerId" element={<Displaybus />} />
          <Route path="/user/bus/search/:dataToSearch" element={<Viewbusesuser />} />
          <Route path="/seatslayout/:selectedBusId" element={<Seats />} />
          <Route path="/super/admin/ManageUsers" element={<ManageUsers />} />
          <Route path="/user/managebooking" element={<ManageBooking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user/profile/:id" element={<UserProfie />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/admin/seatLayout" element={<SeatLayout />} />
          <Route path="/admin/incomreport/:ownerId" element={<AdminReport />} />
          <Route path="/super/admin/report" element={<SuperAdminReport />} />
          <Route path="/super/admin/LocalUsers" element={<LocalUsers />} />
        </Routes>
      </ConfirmProvider>
    </BrowserRouter>
  );
}

export default App;
