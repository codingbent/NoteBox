import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    let navigate = useNavigate();
    const [details, setDetails] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5002";
        // No need to define host — Vercel will proxy the request
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: details.email,
                password: details.password,
            }),
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            localStorage.setItem("name", json.name);
            navigate("/");
            props.showAlert("Successfully logged in", "success");
        } else {
            props.showAlert("Enter correct credentials", "danger");
        }
    };

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="container my-5 px-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={details.email}
                            name="email"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={details.password}
                            id="password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
