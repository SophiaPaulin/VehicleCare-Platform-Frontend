import { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { showToast } from "../../Assets/toasts";
import { mycontext } from "../../App";

export default function SignUp() {
    const { baseURL } = useContext(mycontext);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuthContext();

    const goToSignIn = () => {
        navigate("/login");
    };

    function handleSignup(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;

        // Basic validation
        if (!email || !password) {
            showToast("Email or Password is required", "warning");
            return;
        }
        axios
            .post(
                `${baseURL}/api/register`,
                { email, password, name },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((response) => {
                if (response.data?.success) {
                    // sessionStorage.setItem("userId", response.data?.userId);
                    showToast("Register Success", "success");
                    navigate("/login");
                } else {
                    showToast(response.data?.message, "error");
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                showToast("An error occurred during signup", "error");
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-12 d-flex align-items-center justify-content-center"
                    style={{ marginTop: "7em" }}
                >
                    <form>
                        <div className="card" style={{ width: "400px" }}>
                            <div className="card-body">
                                <h3 className="text-center m-4">Register</h3>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        ref={nameRef}
                                        type="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ width: "100%" }}
                                    onClick={handleSignup}
                                >
                                    Register
                                </button>
                                <br />
                                <br />
                                <button
                                    className="btn btn-link"
                                    style={{ width: "100%" }}
                                    onClick={goToSignIn}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
