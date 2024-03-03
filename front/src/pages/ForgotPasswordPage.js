import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordApi } from '../services/Api';
export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const initialStateErrors = {
        email: { required: false },
        verificationStatus: "",
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ email: "" });

    const handleInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
        // Clear the error message when the user starts typing again
        setErrors({ ...initialStateErrors });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({ ...initialStateErrors });

        // Validate the form
        if (!input.email.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: { required: true }
            }));
            return;
        }

        // If form is valid, proceed with API call
        setLoading(true);
        try {
            const response = await ForgotPasswordApi(input.email);
            if (response.data.status == 200) {
                if (!response.data.error) {
                    console.log("oki")
                    localStorage.setItem('email', input.email);
                    console.log("Email stored in localStorage:", localStorage.getItem('email'));
                    console.log("Navigating to /verifyforgotpassword");
                    navigate('/verifyforgotpassword');
                }    
                 else if (response.data.error) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        verificationStatus: response.data.error
                    }));
                }
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            console.error("Error in ForgotPasswordApi:", error);
            setErrors(prevErrors => ({
                ...prevErrors,
                custom_error: "Verification failed"
            }));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <NavBar className="navbar navbar-expand-lg navbar-light bg-light" />
            <section className="verify-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Request for Password Reset</h2>
                            <form onSubmit={handleSubmit} className="passwordReset-form" action="">
                                <div className="form-group">
                                    <label htmlFor="email" className="text-uppercase">Enter Your Email</label>
                                    <input type="text" className="form-control" onChange={handleInput} name="email" id="" />
                                    {errors.email.required && <span className="text-danger">Email is required.</span>}
                                </div>

                                <div className="form-group">
                                    {loading && (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                    {errors.custom_error && <p className='text-danger'>{errors.custom_error}</p>}
                                    <input type="submit" className="btn btn-login float-right" disabled={loading} value="Submit" />
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
