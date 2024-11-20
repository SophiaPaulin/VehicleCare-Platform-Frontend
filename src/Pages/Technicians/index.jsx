import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const TechnicianList = () => {
    const { baseURL } = useContext(mycontext);
    const [technicians, setTechnicians] = useState([]);

    const goToEditPage = (id) => {
        console.log({ id });
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/technician/getAllTechnician`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("serviceType", response);
                if (response?.data?.status) {
                    setTechnicians(response.data.result);
                } else setTechnicians([]);
            })
            .catch((error) => {
                console.log({ error });
                showToast(error?.response?.data?.message || "Something went wrong!", "error");
            });
    }, []);

    return (
        <>
            <h3>Technician Lists</h3>
            <div className="card p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicians && technicians.length > 0 ? (
                            technicians.map((technician) => (
                                <tr key={technician._id}>
                                    <td>{technician.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => goToEditPage(technician._id)}
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

export default TechnicianList;
