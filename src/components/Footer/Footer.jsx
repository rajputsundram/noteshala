'use client'
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const departments = [
    { name: "BCA", path: "/departments/bca" },
    { name: "MCA", path: "/departments/mca" },
    { name: "BCA-CTIS", path: "/departments/bca-ctis" },
    { name: "BCA-DS", path: "/departments/bca-ds" }
  ];

  const impLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms" }
  ];

  const SocialIcons = [
    { icons: <BsTwitterX size={18} />, path: "https://twitter.com/noteshala" },
    { icons: <FaInstagram size={18} />, path: "https://instagram.com/noteshala" },
    { icons: <FaFacebookF size={18} />, path: "https://facebook.com/noteshala" },
    { icons: <FaLinkedinIn size={18} />, path: "https://linkedin.com/company/noteshala" }
  ];

  return (
    <footer className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First section - Brand info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white border-b-2 border-green-500 pb-2 w-fit">
              Noteshala
            </h1>
            <p className="text-gray-300 leading-relaxed">
              Your one-stop destination for quality educational resources and study materials.
              Empowering students with knowledge for a brighter future.
            </p>
            <Link href="/about" className="text-green-400 hover:text-green-300 font-medium transition-colors inline-block">
              Learn more →
            </Link>
          </div>

          {/* Second section - Departments */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b-2 border-green-500 pb-2 w-fit">
              Departments
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {departments.map((dept, index) => (
                <Link 
                  key={index} 
                  href={dept.path} 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  {dept.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Third section - Important links */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b-2 border-green-500 pb-2 w-fit">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {impLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.path} 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Fourth section - Social media */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b-2 border-green-500 pb-2 w-fit">
              Connect With Us
            </h2>
            <p className="text-gray-300">
              Follow us on social media for updates and announcements.
            </p>
            <div className="flex space-x-4">
              {SocialIcons.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-white hover:text-green-600 text-white rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={`Social media link ${index}`}
                >
                  {item.icons}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Noteshala. All rights reserved.</p>
          <p className="text-sm mt-2">
            Designed with ❤️ for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;