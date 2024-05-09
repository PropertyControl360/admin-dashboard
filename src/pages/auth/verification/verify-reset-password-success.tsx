import { Icon } from "@iconify/react";
import { useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Snackbar } from "@mui/material";

import { paths } from "src/routes/paths";

import axios from "src/utils/axios";

import Logo from "src/components/logo/logo";

function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    console.log('Token:', token);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    // const [snackbarType, setSnackbarType] = useState<"error" | "info" | "success" | "warning">("success");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const { password, confirmPassword } = formData;

        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(password)) {
            errors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, one numeric, and one special character';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // If validation fails, return early
            return;
        }

        // Validation succeeded, continue with your form submission logic
        const requestBody = {
            token,
            password: formData.password,
        };

        try {
            const response = await axios.patch(`/resetPassword`, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setSnackbarMessage("Password reset successfully");
                // setSnackbarType("success");
                setFormData({
                    password: "",
                    confirmPassword: "",
                });
                navigate(paths.auth.resetPasswordVerifySuccess);
            } else {
                setSnackbarMessage("Password reset failed");
                // setSnackbarType("error");
            }
        } catch (error) {
            setSnackbarMessage("Error resetting password");
            // setSnackbarType("error");
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="header">
                    <Logo />
                    <h2 className="title">Reset Password</h2>
                </div>
                <form onSubmit={handleSubmit} className="reset-form">
                    <div className="input-box-wrapper">
                        <div className="password-box">
                            <Icon icon="material-symbols:lock" />
                            <input
                                id="password-input"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                required
                                onChange={handleInputChange}
                                className="password-input"
                                placeholder="Password"
                            />
                            {showPassword ? (
                                <Icon icon="mdi:eye" onClick={
                                    () => {
                                        setShowPassword(false);
                                    }
                                } className="password-eye-icon" />
                            ) : (
                                <Icon icon="mdi:eye-off" onClick={
                                    () => {
                                        setShowPassword(true);
                                    }
                                } className="password-eye-icon" />
                            )}
                        </div>
                        {validationErrors.password && <p className="error">{validationErrors.password}</p>}
                    </div>
                    <div className="input-box-wrapper">
                        <div className="password-box">
                            <Icon icon="material-symbols:lock" />
                            <input
                                id="password-input"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                required
                                onChange={handleInputChange}
                                className="password-input"
                                placeholder="Confirm Password"
                            />
                            {showConfirmPassword ? (
                                <Icon icon="mdi:eye" onClick={
                                    () => {
                                        setShowConfirmPassword(false);
                                    }
                                } className="password-eye-icon" />
                            ) : (
                                <Icon icon="mdi:eye-off" onClick={
                                    () => {
                                        setShowConfirmPassword(true);
                                    }
                                } className="password-eye-icon" />
                            )}
                        </div>
                        {validationErrors.confirmPassword && <p className="error">{validationErrors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="reset-button">Reset Password</button>
                </form>
            </div>
            <Snackbar message={snackbarMessage} open={snackbarOpen} onClose={handleSnackbarClose} />

        </>
    );
}

export default ResetPassword;