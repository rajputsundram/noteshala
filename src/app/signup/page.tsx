"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/Authcontext"; // ✅ Import the AuthContext

const Signup = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth(); // ✅ Get authentication setter from context
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                toast.success("Signup successful! Redirecting...");

                // ✅ Update authentication state
                setIsAuthenticated(true);

                setCredentials({ name: "", email: "", password: "", department: "" });

                // ✅ Redirect and refresh the page to update navbar
                setTimeout(() => {
                    router.push("/"); 
                    router.refresh(); // ✅ Ensures the navbar updates
                }, 1000);
            } else {
                toast.error(response.data.msg || "Signup failed. Try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8"
                >
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
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="department">Department</label>
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
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-green-600 hover:text-white"
                        >
                            Sign Up
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
