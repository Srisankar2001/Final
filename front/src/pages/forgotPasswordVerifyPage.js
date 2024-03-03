import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { VerifyApi, VerifyEmailApi } from '../services/Api';

export default function VerifyForgotPasswordPage() {
    const navigate = useNavigate();

    const initialStateErrors = {
        otp: { required: false },
        verificationStatus: "",
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ otp: "" });

    const handleInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors1 = { ...initialStateErrors };
        let hasError = false;

        if (input.otp === "") {
            errors1.otp.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            VerifyEmailApi(localStorage.getItem('email'),input.otp).then(response => {
                if (response.data.status === 200) {
                    if (response.data.data) {
                        setErrors({ ...errors1, verificationStatus: response.data.data });
                        navigate(`/passwordreset`);
                    }
                    if (response.data.error) {
                        setErrors({ ...errors1, verificationStatus: response.data.error });
                    }
                } else {
                    throw new Error("Verification failed");
                }
            }).catch((err) => {
                console.log(err.message);
                setErrors({ ...errors1, custom_error: "Verification failed" });
            }).finally(() => {
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
                            <h2 className="text-center">Verify</h2>
                            <form onSubmit={handleSubmit} className="verify-form" action="">
                                <div className="form-group">
                                    <label htmlFor="otp" className="text-uppercase">Enter OTP</label>
                                    <input type="text" className="form-control" onChange={handleInput} name="otp" id="" />
                                    {errors.otp.required ? (<span className="text-danger">OTP is required.</span>) : null}
                                </div>

                                <div className="form-group">
                                    {loading ? (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null}
                                    {errors.custom_error ? (<p className='text-danger'>{errors.custom_error}</p>) : null}
                                    <input type="submit" className="btn btn-login float-right" disabled={loading} value="Confirm" />
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
