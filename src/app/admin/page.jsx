"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // Call the API to verify authentication and admin status
                const response = await axios.get("/api/user");

                console.log("👤 User data:", response.data);

                if (!response.data.success || !response.data.isAdmin) {
                    console.log("⛔ Not an admin. Redirecting...");
                    router.replace("/home"); // Redirect non-admin users
                    return;
                }

                setIsAdmin(true);
                setIsLoading(false);
            } catch (error) {
                console.error("🚨 Admin check failed:", error.response?.data || error.message);
                router.replace("/login"); // Redirect to login on failure
            }
        };

        checkAdmin();
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {isAdmin ? <p>Welcome, Admin!</p> : <p>Redirecting...</p>}
        </div>
    );
}
