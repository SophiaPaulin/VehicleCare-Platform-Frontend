import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const VehiclesList = () => {
    const { baseURL } = useContext(mycontext);
    const [vehicles, setVehicles] = useState([]);
    console.log(vehicles)
    const goToEditPage = (id) => {
        console.log({ id });
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/vehicle/getAllVehicle`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("vehicles", response);
                if (response?.data?.status == true) {
                    setVehicles(response?.data?.result);
                } else setVehicles([]);
            })
            .catch((error) => {
                console.log({ error });
                showToast(error?.response?.data?.message || "Something went wrong!", "error");
            });
    }, []);

    return (
        <>
            <h3>Vehicles Lists</h3>
            <div className="card p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Owner Name</th>
                            <th scope="col">Model</th>
                            <th scope="col">Registeration No</th>
                            <th scope="col">Year</th>
                            <th scope="col">Kms Driven</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles && vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <tr key={vehicle._id}>
                                    <td>{vehicle.ownerName}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.registerationNumber}</td>
                                    <td>{vehicle.year}</td>
                                    <td>{vehicle.kmsDriven}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => goToEditPage(type._id)}
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

export default VehiclesList;
