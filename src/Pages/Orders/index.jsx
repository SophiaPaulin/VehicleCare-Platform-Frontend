import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import axios from "axios";
import { paymentModes } from "../../Contants";
import Select from "../../Elements/Select";
import TextInput from "../../Elements/TextInput";
import useOffers from "../../Hooks/useOffersApi/useOffersApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../../App";

const initialState = {
    products: [""],
    orderValue: 0,
    isPaid: false,
    paymentMode: "Cash On Delivery",
    orderStatus: "Placed",
    duration: null
};

export default function OrdersCreate() {
    const { baseURL } = useContext(mycontext);
    const [offers, error] = useOffers();
    const navigation = useNavigate();
    return (
        <div className="container">
            <div className="container-fluid">
                <Formik
                    initialValues={initialState}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log({ values });
                        const payload = {
                            ...values,
                            userId: localStorage.getItem("userId")
                        };
                        if (values) {
                            axios
                                .post(`${baseURL}/api/orders/create`, payload, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        authorization: localStorage.getItem("token")
                                    }
                                })
                                .then((response) => {
                                    setSubmitting(false);
                                    resetForm();
                                    console.log("order-", response);
                                    if (response?.data?.status) {
                                        navigation("/dashboard/orders/manage");
                                    }
                                })
                                .catch((error) => console.log(error));
                        }
                    }}
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
                                    <div className="mb-3">
                                        <FieldArray name="products">
                                            {({ remove, push }) => (
                                                <div>
                                                    {values.products.length > 0 &&
                                                        values.products.map((product, index) => (
                                                            <div
                                                                className="row mb-2 d-flex align-items-center"
                                                                key={index}
                                                            >
                                                                <div className="col">
                                                                    <label
                                                                        htmlFor={`products.${index}`}
                                                                    >
                                                                        Product {index + 1}
                                                                    </label>
                                                                    <Field
                                                                        name={`products.${index}`}
                                                                        placeholder="Enter Product Name"
                                                                        type="text"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`products.${index}`}
                                                                        component="div"
                                                                        className="field-error"
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={() =>
                                                                            remove(index)
                                                                        }
                                                                    >
                                                                        <i className="fas fa-fw fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => push("")}
                                                    >
                                                        + Add Products
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                    <TextInput
                                        label="Order Value"
                                        id="orderValue"
                                        name="orderValue"
                                        type="text"
                                        value={values["orderValue"]}
                                        placeholder="Enter Order Value"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <TextInput
                                        label="Order Description"
                                        id="description"
                                        name="description"
                                        type="text"
                                        value={values["description"]}
                                        placeholder="Enter Order Description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <TextInput
                                        label="Duration"
                                        id="duration"
                                        name="duration"
                                        type="text"
                                        value={values["duration"]}
                                        placeholder="Enter Duration"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <div className="row">
                                        <Select
                                            label="Payment Mode"
                                            id="paymentMode"
                                            name="paymentMode"
                                            value={values["paymentMode"]}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            options={paymentModes?.map((d) => {
                                                return { id: d.id, label: d.label };
                                            })}
                                        />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={values["isPaid"]}
                                            id="isPaid"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="isPaid">
                                            Order Paid
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-primary mr-2">
                                        Create Order
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
}
