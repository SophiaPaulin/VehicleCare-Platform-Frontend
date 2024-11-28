import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Login/Signup";
// import Settings from "./Pages/Settings";
import Products from "./Pages/Products";
import Insights from "./Pages/Insights";
import Discounts from "./Pages/Discounts";
import ManageProducts from "./Pages/Products/ManageProducts";
import ManageDiscounts from "./Pages/Discounts/ManageDiscounts";
import { useAuthContext } from "./Context/AuthContext";
import NotFound from "./Pages/NotFound";
import CreateBrand from "./Pages/Brands";
import ManageBrands from "./Pages/Brands/ManageBrands";
import ManageOrders from "./Pages/Orders/manageOrders";
import OrdersCreate from "./Pages/Orders";
import ServiceTypeList from "./Pages/ServiceType";
import "react-toastify/dist/ReactToastify.css";
import CreateServiceType from "./Pages/ServiceType/CreateServiceType";
import TechnicianList from "./Pages/Technicians";
import CreateTechnicians from "./Pages/Technicians/CreateTechnicians";
import CarOwnerList from "./Pages/CarOwners";
import CreateCarOwner from "./Pages/CarOwners/CreateCarOwner";
import VehiclesList from "./Pages/Vehicles";
import CreateVehicles from "./Pages/Vehicles/CreateVehicles";
import AppointmentList from "./Pages/Appointments";
import BookAppointment from "./Pages/Appointments/BookAppointment";
import Dashboard from "./Pages/Dashboard";

export const mycontext = createContext(true);

function App() {
    const { isLoggedIn } = useAuthContext();
    const baseURL = "http://localhost:9002";
    //  const baseURL="https://vehiclecare-platform-backend.onrender.com";
    return (
        <div>
            <mycontext.Provider value={{ baseURL }}>
                <ToastContainer />
                <Routes>
                    {!isLoggedIn && <Route Component={Login} exact path="/" />}
                    <Route Component={Login} path="/login" />
                    <Route Component={SignUp} path="/register" />
                    {isLoggedIn && (
                        <Route Component={Landing} path="/dashboard">
                            <Route Component={Dashboard} path="/dashboard" />

                            <Route Component={ServiceTypeList} path="/dashboard/service-type" />
                            <Route
                                Component={CreateServiceType}
                                path="/dashboard/service-type/create"
                            />

                            <Route Component={TechnicianList} path="/dashboard/technicians" />
                            <Route
                                Component={CreateTechnicians}
                                path="/dashboard/technicians/create"
                            />

                            <Route Component={CarOwnerList} path="/dashboard/car-owners" />
                            <Route Component={CreateCarOwner} path="/dashboard/car-owners/create" />

                            <Route Component={VehiclesList} path="/dashboard/vehicles" />
                            <Route Component={CreateVehicles} path="/dashboard/vehicles/create" />

                            <Route Component={AppointmentList} path="/dashboard/appointments" />
                            <Route
                                Component={BookAppointment}
                                path="/dashboard/appointments/create"
                            />
                        </Route>
                    )}
                    <Route Component={NotFound} path="*" />
                </Routes>
            </mycontext.Provider>
        </div>
    );
}

export default App;
