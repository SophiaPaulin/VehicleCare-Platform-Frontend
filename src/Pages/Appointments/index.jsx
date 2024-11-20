import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const AppointmentList = () => {
    const { baseURL } = useContext(mycontext);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    const goToEditPage = (id) => {
        console.log({ id });
    };

    const goToCreate = () => {
        navigate("/dashboard/appointments/create");
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/appointment/getAllAppointment`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("appointment", response);
                if (response?.data?.status) {
                    setAppointments(response.data.appointmentDatas);
                } else setAppointments([]);
            })
            .catch((error) => {
                console.log({ error });
                showToast(error?.response?.data?.message || "Something went wrong!", "error");
            });
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3>Appointments Lists</h3>
                <button className="btn btn-outline-primary" onClick={goToCreate}>
                    Create <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="card p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Vehicle Name</th>
                            <th>Vehicle No</th>
                            <th>Vehicle Owner</th>
                            <th>Owner Mobile</th>
                            <th>Technician Name</th>
                            <th>Service Status</th>
                            <th scope="col">Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment?.vechicleData?.model}</td>
                                    <td>{appointment?.vechicleData?.registerationNumber}</td>
                                    <td>{appointment.ownerName}</td>
                                    <td>{appointment.ownerMobile}</td>
                                    <td>{appointment.technicianName}</td>
                                    <td>
                                        {appointment.status === "Completed" && (
                                            <span className="badge badge-success">
                                                {appointment.status}
                                            </span>
                                        )}
                                        {appointment.status === "Scheduled" && (
                                            <span className="badge badge-warning">
                                                {appointment.status}
                                            </span>
                                        )}
                                        {appointment.status === "Delivered" && (
                                            <span
                                                className="badge badge-danger"
                                                style={{ textDecoration: "line-through" }}
                                            >
                                                {appointment.status}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {moment(appointment.appointmentDate).format("M-D-YYYY")}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => goToEditPage(appointment._id)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AppointmentList;
