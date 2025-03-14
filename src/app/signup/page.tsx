"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/Authcontext"; // Import AuthContext

const Signup = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth(); // Get auth setter from context

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If OTP hasn't been sent, initiate signup by sending credentials to generate OTP.
        if (!otpSent) {
            if (!credentials.name || !credentials.email || !credentials.password || !credentials.department) {
                toast.error("All fields are required!");
                return;
            }

            if (!isValidEmail(credentials.email)) {
                toast.error("Invalid email format!");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("name", credentials.name);
                formData.append("email", credentials.email);
                formData.append("password", credentials.password);
                formData.append("department", credentials.department);

                const response = await axios.post("/api/userSignUp", formData);

                if (response.data.success) {
                    toast.success("OTP sent to your email. Please check and enter OTP.");
                    setOtpSent(true);
                } else {
                    toast.error(response.data.msg || "Signup failed. Try again.");
                }
            } catch (error) {
                console.error("Signup Error:", error);
                toast.error("Something went wrong. Please try again.");
            }
        } else {
            // If OTP was sent, now verify it.
            if (!otp) {
                toast.error("Please enter the OTP sent to your email.");
                return;
            }

            try {
                const res = await axios.post("/api/verify-otp", {
                    email: credentials.email,
                    enteredOtp: otp,
                });

                if (res.data.success) {
                    toast.success("Signup successful! Redirecting...");
                    setIsAuthenticated(true);
                    // Reset states if needed
                    setCredentials({ name: "", email: "", password: "", department: "" });
                    setOtp("");
                    setOtpSent(false);

                    setTimeout(() => {
                        router.push("/");
                        router.refresh();
                    }, 1000);
                } else {
                    toast.error(res.data.msg || "OTP verification failed. Try again.");
                }
            } catch (error) {
                console.error("OTP Verification Error:", error);
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8"
                >
                    {/* Signup Fields */}
                    {!otpSent && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    onChange={handleChange}
                                    required
                                    name="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    value={credentials.name}
                                    className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={credentials.email}
                                    className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    onChange={handleChange}
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    value={credentials.password}
                                    className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="department" className="text-gray-700 dark:text-gray-300">
                                    Department
                                </label>
                                <input
                                    onChange={handleChange}
                                    required
                                    name="department"
                                    type="text"
                                    placeholder="Your department"
                                    value={credentials.department}
                                    className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </>
                    )}

                    {/* OTP Field */}
                    {otpSent && (
                        <div className="mb-4">
                            <label htmlFor="otp" className="text-gray-700 dark:text-gray-300 font-bold mb-2">
                                Enter OTP
                            </label>
                            <input
                                onChange={handleOtpChange}
                                required
                                name="otp"
                                placeholder="Enter OTP"
                                type="text"
                                value={otp}
                                className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-green-600 hover:text-white"
                        >
                            {otpSent ? "Verify OTP" : "Sign Up"}
                        </button>
                        <Link href="/login">
                            <button
                                type="button"
                                className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-green-600 hover:text-white text-gray-900 dark:text-gray-100"
                            >
                                Already a user?
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
