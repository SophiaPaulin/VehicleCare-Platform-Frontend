import { Formik } from "formik";
import axios from 'axios';
import TextInput from "../../Elements/TextInput";
import { showToast } from "../../Assets/toasts";
import { useAuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { mycontext } from "../../App";

const initialState = {
  brandName: "",
  email: "",
  phoneNumber: "",
  branch: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    areaCode: ""
  },
  isAvailable: false,
};

export default function CreateBrand() {
  const { baseURL } = useContext(mycontext)
  const { currentUser = {} } = useAuthContext();
  return (
    <div className="container">
      <div className="container-fluid">
        <Formik
          initialValues={initialState}
          validate={(values) => {
            const errors = {};
            if (!values.brandName) {
              errors.brandName = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log({ values })
            if (values) {
              console.log({ values })
              axios.post(`${baseURL}/api/brands/create`,values, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: sessionStorage.getItem("token"),
                },
              })
                .then((response) => {
                  setSubmitting(false);
                  resetForm();
                  if (response.data.success) {
                    showToast(response.data.message);
                  }
                })
                .catch((error) => {
                  showToast(error, "error");
                });
            }
          }}
        >
          {({
            values = {},
            handleChange = () => { },
            handleBlur = () => { },
            handleSubmit = () => { },
            resetForm = () => { },
          }) => (
            <form onSubmit={handleSubmit}>
              {/* {JSON.stringify(values, null, 2)} */}
              <div className="row">
                <div className="col-6">
                  <TextInput
                    label="Brand Name"
                    id="brandName"
                    name="brandName"
                    type="text"
                    value={values["brandName"]}
                    placeholder="Enter Brand name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Email Id"
                    id="email"
                    name="email"
                    type="text"
                    value={values["email"]}
                    placeholder="Enter Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Branch"
                    id="branch"
                    name="branch"
                    type="text"
                    value={values["branch"]}
                    placeholder="Enter Branch"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Address Line 1"
                    id="addressLine1"
                    name="address.addressLine1"
                    type="text"
                    value={values.address.addressLine1}
                    placeholder="Enter Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Address Line 2"
                    id="addressLine2"
                    name="address.addressLine2"
                    type="text"
                    value={values.address["addressLine2"]}
                    placeholder="Enter Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="City"
                    id="city"
                    name="address.city"
                    type="text"
                    value={values.address["city"]}
                    placeholder="Enter City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="State"
                    id="state"
                    name="address.state"
                    type="text"
                    value={values.address["state"]}
                    placeholder="Enter State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Area Code"
                    id="areaCode"
                    name="address.areaCode"
                    type="text"
                    value={values.address["areaCode"]}
                    placeholder="Enter Area Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Phone Number"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={values["phoneNumber"]}
                    placeholder="Enter Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={values["isAvailable"]}
                      id="isAvailable"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isAvailable">
                      Brand Available
                    </label>
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary mr-2">
                    Create Brand
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
