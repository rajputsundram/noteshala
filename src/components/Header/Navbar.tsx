"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaLock, FaUsers } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode, MdOutlineLogout } from "react-icons/md";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/Authcontext";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useAuth(); // ✅ Ensure `loading` state exists
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Debug: Log authentication state
  console.log("Navbar Render -> Authenticated:", isAuthenticated, "Loading:", loading);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoading(true); // ✅ Set loading before request
      try {
        const response = await axios.get("/api/auth/me");
        console.log("Fetched Auth Status:", response.data); // ✅ Debug
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // ✅ Ensure loading is false after request
      }
    };

    fetchAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setIsAuthenticated(false);
      router.push("/login"); // ✅ Redirect without refresh
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Departments", path: "#" },
    { name: "Blogs", path: "/Blogs" },
    { name: "Contact us", path: "/ContactUs" },
  ];

  return (
    <div className="flex h-32 items-center justify-between px-8">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/images/Pietlogo.png" width={40} height={40} alt="logo" />
        <p className="ml-2 font-serif text-3xl font-extrabold text-blue-950 dark:text-white">Noteshala</p>
      </Link>

      {/* Nav Links */}
      <nav className="flex gap-8">
        {links.map((link, index) => (
          <div key={link.path} className="relative"> {/* ✅ Fixed key prop */}
            <Link
              href={link.path}
              className={`${pathname === link.path ? "text-green-500 border-b-2 border-green-500" : ""} capitalize font-medium hover:text-green-500 transition-all`}
              onMouseEnter={link.name === "Departments" ? () => setDropdownOpen(true) : undefined}
            >
              {link.name}
            </Link>
            {link.name === "Departments" && dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute left-0 mt-2 w-52 rounded-sm text-lg bg-white border border-gray-200 shadow-lg"
              >
                <Link href="/bcactis" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">BCA-CTIS</Link>
                <Link href="/bca" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">BCA-GEN</Link>
                <Link href="/bcads" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">BCA-DS</Link>
                <Link href="/mca" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">MCA</Link>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Login/Logout & Theme Toggle */}
      <div className="flex items-center gap-4">
        {!loading && (
          isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 border border-green-800 hover:bg-green-700 bg-green-500 p-2 text-white rounded-md"
            >
              Logout <MdOutlineLogout />
            </button>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-1 border border-green-800 hover:bg-green-700 bg-green-500 p-2 text-white rounded-md">
                <FaLock />
                Login
              </Link>
              <Link href="/signup" className="flex items-center gap-1 border border-green-800 hover:bg-green-700 bg-green-500 p-2 text-white rounded-md">
                <FaUsers />
                Signup
              </Link>
            </>
          )
        )}

        {/* Theme Toggle */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full">
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
