import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let navigator = useNavigate();

    const [token, setToken] = useState(null);
    const [name, setName] = useState("");

    // Load localStorage ONLY on client
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setName(localStorage.getItem("name"));
    }, []);

    const handlelogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setToken(null);
        setName("");

        navigator("/login");
        props.showAlert("Successfully Logged Out", "success");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    NoteBox
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/" ? "active" : ""
                                }`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/about" ? "active" : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    {/* Conditional UI AFTER hydration-safe state */}
                    {!token ? (
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-primary mx-2" to="/signup">
                                Sign Up
                            </Link>
                        </form>
                    ) : (
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-light fw-semibold">👤 {name}</span>
                            <button
                                className="btn btn-sm btn-outline-light rounded-pill px-3"
                                onClick={handlelogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
