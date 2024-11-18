import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { showToast } from "../../Assets/toasts";
import { useAuthContext } from "../../Context/AuthContext";
import { mycontext } from "../../App";

export default function ManageBrands() {
    const {baseURL}= useContext(mycontext)
    const [brands, setBrands] = useState([])
    const { currentUser } = useAuthContext();

    useEffect(() => {
        // if (currentUser) {
            axios.get(`${baseURL}/api/brands/getAllBrands`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("token"),
                }
            })
            .then((response) => {
                console.log({response})
                if (response.status === 200) {
                    showToast(response.data.message)
                    setBrands(response.data.result)
                }
            })
            .catch((error) => {
                showToast(error.message, "error")
            })
       //
    }, [currentUser]);

  return (
    <div className="container">
    <table className="table">
    <thead>
        <tr>
        <th scope="col">S.NO</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Branch</th>
        <th scope="col">Address</th>
        <th scope="col">Is Available</th>
        </tr>
    </thead>
    <tbody>
        {brands && brands.length > 0 ? brands.map((brand,index) => (
                    <tr> 
                        <td>{index+1}</td>
                        <td>{brand.name}</td>
                        <td>{brand.email}</td>
                        <td>{brand.phoneNumber}</td> 
                        <td>{brand.branch}</td> 
                        <td>{brand.address.addressLine1}</td>
                        <td>{brand.isAvailable ? "Available" : "Not Available"}</td>
                    </tr>
                )): (
                    <tr><td>No Brands Found</td></tr>
                )}
             </tbody>
        </table>
    </div>
  );
}
