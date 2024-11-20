import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import TextInput from "../../Elements/TextInput";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";
import Select from "../../Elements/Select";

const initialState = {
    technician_id: "",
    vehicle_id: "",
    owner_id: "",
    appointment_date: "",
    status: ""
};

const status = [
    {
        id: "Scheduled",
        label: "Scheduled"
    },
    {
        id: "Completed",
        label: "Completed"
    },
    {
        id: "Delivered",
        label: "Delivered"
    }
];

const BookAppointment = () => {
    const { baseURL } = useContext(mycontext);
    const navigation = useNavigate();
    const [carOwners, setCarOwners] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const goBack = () => {
        navigation("/dashboard/appointments");
    };

    const getAllOwners = async () => {
        await axios
            .get(`${baseURL}/api/owner/getAllOwner`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("owners---", { response });
                if (response?.data?.status) {
                    const owners = response?.data?.result;

                    const filteredData = owners.map((owner) => ({
                        id: owner._id,
                        label: owner.firstName + " " + owner.lastName
                    }));
                    setCarOwners(filteredData);
                } else setCarOwners([]);
            })
            .catch((error) => {
                console.log({ error });
            });
    };

    const getAllTechnicians = async () => {
        await axios
            .get(`${baseURL}/api/technician/getAllTechnician`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("technicians---", { response });
                if (response?.data?.status) {
                    const technicians = response?.data?.result;

                    const filteredData = technicians.map((technician) => ({
                        id: technician._id,
                        label: technician.name
                    }));
                    setTechnicians(filteredData);
                } else setTechnicians([]);
            })
            .catch((error) => {
                console.log({ error });
            });
    };
    console.log({ carOwners, vehicles, technicians });
    const getAllVehicles = async () => {
        await axios
            .get(`${baseURL}/api/vehicle/getAllVehicle`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("vehicles---", { response });
                if (response?.data?.status) {
                    const vehicleData = response?.data?.result;
                    const filteredData = vehicleData.map((vehicle) => ({
                        id: vehicle._id,
                        label: vehicle.model
                    }));
                    setVehicles(filteredData);
                } else setVehicles([]);
            })
            .catch((error) => {
                console.log({ error });
            });
    };

    const handleSubmit = async (values) => {
        console.log({ values });
        const payload = {
            vehicleId: values.vehicle_id,
            technicianId: values.technician_id,
            appointmentDate: values.appointment_date,
            status: values.status
        };
        await axios
            .post(`${baseURL}/api/appointment/create`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("book appointment---", { response });
                if (response?.data?.status) {
                    navigation("/dashboard/appointments");
                }
            })
            .catch((error) => {
                console.log({ error });
            });
    };

    useEffect(() => {
        getAllOwners();
        getAllTechnicians();
        getAllVehicles();
    }, []);

    return (
        <div className="container-fluid">
            <Formik
                initialValues={initialState}
                // validate={(values) => {
                //     const errors = {};
                //     if (!values.ownerId) errors.ownerId = "Required";
                //     if (!values.model) errors.model = "Required";
                //     if (!values.registerationNumber) errors.registerationNumber = "Required";
                //     if (!values.kmsDriven) errors.kmsDriven = "Required";
                //     return errors;
                // }}
                onSubmit={handleSubmit}
            >
                {({
                    values = {},
                    errors = {},
                    handleChange = () => {},
                    handleBlur = () => {},
                    touched = {},
                    handleSubmit = () => {},
                    resetForm = () => {}
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <Select
                                    label="Select Technician"
                                    id="technician_id"
                                    name="technician_id"
                                    value={values.technician_id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    options={technicians}
                                />

                                <Select
                                    label="Select Vehicle"
                                    id="vehicle_id"
                                    name="vehicle_id"
                                    value={values.vehicle_id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    options={vehicles}
                                />
                                <Select
                                    label="Select Owner"
                                    id="owner_id"
                                    name="owner_id"
                                    value={values.owner_id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    options={carOwners}
                                />
                                <TextInput
                                    label="Appointment Date"
                                    id="appointment_date"
                                    name="appointment_date"
                                    type="date"
                                    value={values.appointment_date}
                                    onChange={handleChange}
                                />
                                <Select
                                    label="Select Status"
                                    id="status"
                                    name="status"
                                    value={values.status}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    options={status}
                                />

                                <button type="submit" className="btn btn-sm btn-primary mr-2">
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary mr-2"
                                    onClick={() => goBack()}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="btn btn-sm btn-outline-primary"
                                >
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default BookAppointment;
