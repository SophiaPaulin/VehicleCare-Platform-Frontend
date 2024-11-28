import { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { showToast } from "../../Assets/toasts";
import { mycontext } from "../../App";

export default function Login() {
    const { baseURL } = useContext(mycontext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigator = useNavigate();
    const { setIsLoggedIn = () => {} } = useAuthContext();

    const goToSignup = () => {
        navigator("/register");
    };

    function handleSignIn(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.length > 0 && password.length > 0) {
            axios
                .post(
                    `${baseURL}/api/login`,
                    { email, password },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then((response) => {
                    if (response.data?.success && response.data?.token) {
                        localStorage.setItem("token", response.data?.token);
                        localStorage.setItem("userId", response.data?.userId);
                        setIsLoggedIn(true);
                        navigator("/dashboard");
                    } else {
                        showToast(response.data.message, "error");
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    showToast(error, "error");
                });
        } else {
            showToast("Email or Password is required", "warning");
        }
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
                                <div className="mb-3">
                                    <h3 className="text-center m-4">Sign In</h3>
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
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                                <br />
                                <br />
                                <a
                                    className="btn btn-link"
                                    type="button"
                                    style={{ width: "100%" }}
                                    onClick={goToSignup}
                                >
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
