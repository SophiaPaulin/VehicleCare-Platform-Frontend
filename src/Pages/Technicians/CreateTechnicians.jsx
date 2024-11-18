import axios from "axios";
import { Formik } from "formik";
import TextInput from "../../Elements/TextInput";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../../App";
import { showToast } from "../../Assets/toasts";

const initialState = {
    name: ""
};

const CreateTechnicians = () => {
    const { baseURL } = useContext(mycontext);
    const navigation = useNavigate();

    const goBack = () => {
        navigation("/dashboard/technicians");
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log({ values });
        if (values) {
            axios
                .post(`${baseURL}/api/technician/create`, values, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: sessionStorage.getItem("token")
                    }
                })
                .then((response) => {
                    setSubmitting(false);
                    resetForm();
                    console.log("technicians", { response });
                    if (response?.data?.status) {
                        navigation("/dashboard/technicians");
                    } else {
                        showToast("Something went wrong!");
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="container">
            <div className="container-fluid">
                <Formik
                    initialValues={initialState}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) errors.name = "Required";
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
                                        label="Technician"
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={values.name}
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
        </div>
    );
};

export default CreateTechnicians;