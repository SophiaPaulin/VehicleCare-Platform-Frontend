import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const ServiceTypeList = () => {
    const { baseURL } = useContext(mycontext);
    const [types, setTypes] = useState([]);

    const goToEditPage = (id) => {
        console.log({ id });
    };

    useEffect(() => {
        axios
            .get(`${baseURL}/api/serviceType/getAllServiceType`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("serviceType", response);
                if (response?.data?.status) {
                    setTypes(response.data.result);
                } else setTypes([]);
            })
            .catch((error) => {
                console.log({ error });
                showToast(error?.response?.data?.message || "Something went wrong!", "error");
            });
    }, []);

    return (
        <>
            <h3>Service Types</h3>
            <div className="card p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types && types.length > 0 ? (
                            types.map((type) => (
                                <tr key={type._id}>
                                    <td>{type.name}</td>
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

export default ServiceTypeList;
