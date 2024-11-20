import axios from "axios";
import { Formik } from "formik";
import TextInput from "../../Elements/TextInput";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: ""
};

const CreateCarOwner = () => {
    const { baseURL } = useContext(mycontext);
    const navigation = useNavigate();

    const goBack = () => {
        navigation("/dashboard/car-owners");
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log({ values });
        if (values) {
            axios
                .post(`${baseURL}/api/owner/create`, values, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    setSubmitting(false);
                    resetForm();
                    console.log("owner", { response });
                    if (response?.data?.status) {
                        navigation("/dashboard/car-owners");
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
                    if (!values.firstName) errors.firstName = "Required";
                    if (!values.lastName) errors.lastName = "Required";
                    if (!values.phoneNumber) errors.phoneNumber = "Required";
                    if (!values.email) errors.email = "Required";
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
                                <TextInput
                                    label="First Name"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <TextInput
                                    label="lastName"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    required
                                />

                                <TextInput
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />
                                <TextInput
                                    label="Mobile"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                                <TextInput
                                    label="address"
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={values.address}
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

export default CreateCarOwner;
