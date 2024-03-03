import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { PasswordChangeApi } from '../services/Api';

export default function PasswordResetPage() {
    const navigate = useNavigate();

    const initialStateErrors = {
        newPassword: { required: false },
        confirmPassword: { required: false },
        verificationStatus: "",
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ newPassword: "", confirmPassword: "" });

    const handleInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors1 = { ...initialStateErrors };
        let hasError = false;

        if (input.newPassword === "") {
            errors1.newPassword.required = true;
            hasError = true;
        }

        if (input.confirmPassword === "") {
            errors1.confirmPassword.required = true;
            hasError = true;
        }

        if (input.newPassword !== input.confirmPassword) {
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            // Retrieve email from localStorage
            let email = localStorage.getItem('email');
            PasswordChangeApi(email, input.newPassword)
                .then(response => {
                    if (response.status === 200) {
                        if (!response.data.error) {
                            setErrors({ ...errors1, verificationStatus: response.data.data });
                            navigate(`/login`);
                        }
                        if (response.data.error) {
                            setErrors({ ...errors1, verificationStatus: response.data.error });
                        }
                    } else {
                        throw new Error("Verification failed");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    setErrors({ ...errors1, custom_error: "Verification failed" });
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        setErrors({ ...errors1 });
    }

    return (
        <div>
            <NavBar className="navbar navbar-expand-lg navbar-light bg-light" />
            <section className="verify-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Password Reset</h2>
                            <form onSubmit={handleSubmit} className="passwordReset-form" action="">
                                <div className="form-group">
                                    <label htmlFor="newPassword" className="text-uppercase">Enter New Password</label>
                                    <input type="password" className="form-control" onChange={handleInput} name="newPassword" id="" />
                                    {errors.newPassword.required ? (<span className="text-danger">New Password is required.</span>) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className="text-uppercase">Confirm Password</label>
                                    <input type="password" className="form-control" onChange={handleInput} name="confirmPassword" id="" />
                                    {errors.confirmPassword.required ? (<span className="text-danger">Confirm Password is required.</span>) : null}
                                </div>

                                <div className="form-group">
                                    {loading ? (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null}
                                    {errors.custom_error ? (<p className='text-danger'>{errors.custom_error}</p>) : null}
                                    <input type="submit" className="btn btn-login float-right" disabled={loading} value="Change Password" />
                                    {errors.verificationStatus && <p>{errors.verificationStatus}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
