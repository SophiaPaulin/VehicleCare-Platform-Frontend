import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const CarOwnerList = () => {
    const { baseURL } = useContext(mycontext);
    const [carOwners, setCarOwners] = useState([]);

    const goToEditPage = (id) => {
        console.log({ id });
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/owner/getAllOwner`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("carOwners", response);
                if (response?.data?.status) {
                    setCarOwners(response.data.result);
                } else setCarOwners([]);
            })
            .catch((error) => {
                console.log({ error });
                showToast(error?.response?.data?.message || "Something went wrong!", "error");
            });
    }, []);

    return (
        <>
            <h3>Car Owners</h3>
            <div className="card p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carOwners && carOwners.length > 0 ? (
                            carOwners.map((owner) => (
                                <tr key={owner._id}>
                                    <td>
                                        {owner.firstName} {owner.lastName}
                                    </td>
                                    <td>{owner.email}</td>
                                    <td>{owner.phoneNumber}</td>
                                    <td>{owner.address}</td>
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

export default CarOwnerList;
