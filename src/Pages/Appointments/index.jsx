import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const AppointmentList = () => {
    const { baseURL } = useContext(mycontext);
    const [appointments, setAppointments] = useState([]);

    const goToEditPage = (id) => {
        console.log({ id });
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/appointment/getAllAppointment`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("token")
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
            <h3>Appointment Lists</h3>
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
                                    <td>{appointment.status}</td>
                                    <td>
                                        {moment(appointment.appointmentDate).format(
                                            "M-D-YYYY HH:MM:SS a"
                                        )}
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
