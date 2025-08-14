"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaLock, FaUsers, FaUserCircle } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/Authcontext";


const Navbar = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    user,
    setUser,
  } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Fetch auth status and user info on mount
  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/auth/me");
        // Expect data = { isAuthenticated: boolean, user: { name, email, isAdmin, ... } }
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user || null);
      } catch (err) {
        console.error("Error fetching auth/me:", err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthStatus();
  }, [setIsAuthenticated, setUser, setLoading]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Navigation links
 const links = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'departments', path: '/departments' },
  { name: 'blogs', path: '/Blogs' },
  { name: 'contact', path: '/contactus' },
]

  return (
    <div className="flex h-32 items-center justify-between px-8">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/images/Pietlogo.png" width={40} height={40} alt="logo" />
        <p className="ml-2 font-serif text-3xl font-extrabold text-blue-950 dark:text-white">
          Noteshala
        </p>
      </Link>

      {/* Primary nav links */}
      <nav className="flex gap-8">
        {links.map(link => (
          <div key={link.path} className="relative">
            <Link
              href={link.path}
              className={`${pathname === link.path ? "text-green-500 border-b-2 border-green-500" : ""} capitalize font-medium hover:text-green-500 transition-all`}
              onMouseEnter={link.name === "Departments" ? () => setDropdownOpen(true) : undefined}
            >
              {link.name}
            </Link>

            {/* Departments dropdown */}
            {link.name === "Departments" && dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-lg"
              >
                <Link href="/bcactis" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  BCA-CTIS
                </Link>
                <Link href="/bca" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  BCA-GEN
                </Link>
                <Link href="/bcads" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  BCA-DS
                </Link>
                <Link href="/mca" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  MCA
                </Link>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User menu & theme toggle */}
      <div className="flex items-center gap-4 relative">
        {!loading && (
          isAuthenticated ? (
            <>
              {/* Profile icon triggers dropdown */}
              <button
                onClick={() => setUserMenuOpen(open => !open)}
                className="p-2 text-2xl text-gray-700 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaUserCircle />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2">
                  {/* Admin link if user.isAdmin */}
                  {user?.isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Admin
                    </Link>
                  )}

                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Login / Signup links */}
              <Link
                href="/login"
                className="flex items-center gap-1 bg-green-500 border border-green-800 px-4 py-2 rounded-md text-white hover:bg-green-600"
              >
                <FaLock /> Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1 bg-green-500 border border-green-800 px-4 py-2 rounded-md text-white hover:bg-green-600"
              >
                <FaUsers /> Signup
              </Link>
            </>
          )
        )}

        {/* Dark/light mode toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black"
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;