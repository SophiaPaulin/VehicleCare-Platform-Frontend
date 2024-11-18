import axios from "axios";
import { Formik } from "formik";
import TextInput from "../../Elements/TextInput";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";
import Select from "../../Elements/Select";

const initialState = {
    ownerId: "",
    model: "",
    registerationNumber: "",
    year: "",
    kmsDriven: ""
};

const CreateVehicles = () => {
    const { baseURL } = useContext(mycontext);
    const navigation = useNavigate();
    const [carOwners, setCarOwners] = useState([]);

    const goBack = () => {
        navigation("/dashboard/vehicles");
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
                console.log({ response });
                if (response?.data?.status) {
                    const owners = response.data.result;

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
    }, []);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log({ values });
        if (values) {
            axios
                .post(`${baseURL}/api/vehicle/create`, values, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: sessionStorage.getItem("token")
                    }
                })
                .then((response) => {
                    setSubmitting(false);
                    resetForm();
                    console.log("owner", { response });
                    if (response?.data?.status) {
                        navigation("/dashboard/vehicles");
                    } else {
                        showToast("Something went wrong!");
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="container-fluid">
            <Formik
                initialValues={initialState}
                validate={(values) => {
                    const errors = {};
                    if (!values.ownerId) errors.ownerId = "Required";
                    if (!values.model) errors.model = "Required";
                    if (!values.registerationNumber) errors.registerationNumber = "Required";
                    if (!values.kmsDriven) errors.kmsDriven = "Required";
                    return errors;
                }}
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
                                    label="Select Owner"
                                    id="ownerId"
                                    name="ownerId"
                                    value={values.ownerId}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    options={carOwners && carOwners}
                                />
                                <TextInput
                                    label="Model"
                                    id="model"
                                    name="model"
                                    type="text"
                                    value={values.model}
                                    onChange={handleChange}
                                    required
                                />

                                <TextInput
                                    label="Registeration Number"
                                    id="registerationNumber"
                                    name="registerationNumber"
                                    type="text"
                                    value={values.registerationNumber}
                                    onChange={handleChange}
                                    required
                                />
                                <TextInput
                                    label="Year"
                                    id="year"
                                    name="year"
                                    type="text"
                                    value={values.year}
                                    onChange={handleChange}
                                    required
                                />
                                <TextInput
                                    label="Kms Driven"
                                    id="kmsDriven"
                                    name="kmsDriven"
                                    type="text"
                                    value={values.kmsDriven}
                                    onChange={handleChange}
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

export default CreateVehicles;
