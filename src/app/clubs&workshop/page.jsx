'use client'
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white text-center px-4 dark:bg-gray-900 dark:text-white light:bg-white light:text-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <AlertTriangle size={80} className="text-yellow-400 animate-bounce" />
        <h1 className="text-4xl font-bold mt-4">Page Under Construction</h1>
        <p className="text-lg mt-2 text-gray-400">
          We are working hard to bring you something amazing. Stay tuned!
        </p>
      </motion.div>
    </div>
  );
};

export default Page;