import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        // check passwords match
        if (password !== cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }

        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5001";
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/auth/createuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const json = await response.json();

            if (json.success) {
                localStorage.setItem("token", json.authtoken);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                navigate("/");
                props.showAlert("Successfully signed up", "success");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            console.error("Signup error:", error);
            props.showAlert("Something went wrong. Try again later.", "danger");
        }
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Enter Your Name
                    </label>
                    <input
                        className="form-control"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Name Surname"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Enter Your Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="cpassword"
                        id="cpassword"
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
