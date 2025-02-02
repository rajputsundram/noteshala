"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await axios.get("/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.data.isAdmin) {
                    router.push("/home"); // Redirect non-admin users
                } else {
                    setIsLoading(false); // Allow access
                }
            } catch (error) {
                router.push("/login");
            }
        };

        checkAdmin();
    }, [router]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
        </div>
    );
}
