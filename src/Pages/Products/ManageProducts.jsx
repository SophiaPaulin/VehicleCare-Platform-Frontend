import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../../App";

export default function ManageProducts() {
    const { baseURL } = useContext(mycontext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseURL}/api/products/getAllProducts`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("products", response);
                if (response?.data?.status) {
                    setProducts(response.data.result);
                }
            })
            .catch((error) => {
                console.log({ error });
            });
    }, []);

    return (
        <>
            <div>Products List</div>
            <div className="card p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Normal Price</th>
                            <th scope="col">Actual Price</th>
                            <th scope="col">Avail Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.normalPrice}</td>
                                    <td>{product.actualPrice}</td>
                                    <td>{product.availableQuantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
