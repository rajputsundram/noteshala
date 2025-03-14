"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const BlogItems = ({
  title,
  author,
  updatedDate,
  publishedDate,
  deleteBlog,
  mongoId,
  description,
  topics = [],
}) => {
  const uploadAreaimg = "/images/upload_area.png";
  // Initialize image state to an empty string (or a default image URL if desired)
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [localTopics, setLocalTopics] = useState(topics);
  const [showTopics, setShowTopics] = useState(false); // For fold/unfold topics
  const [formData, setFormData] = useState({
    heading: title || "",
    description: description || "",
    image: "", // Will store the file object when selected
  });

  // Parse and format ISO dates
  const publishedDateObj = parseISO(publishedDate);
  const updatedDateObj = parseISO(updatedDate);

  const publishedDisplay = isNaN(publishedDateObj)
    ? "Invalid Date"
    : format(publishedDateObj, "yyyy-MM-dd HH:mm:ss");

  const updatedDisplay = isNaN(updatedDateObj)
    ? "Invalid Date"
    : format(updatedDateObj, "yyyy-MM-dd HH:mm:ss");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl); // Update preview image
      setFormData((prev) => ({ ...prev, image: file })); // Store file object
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mongoId) {
      toast.error("Invalid blog ID.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("description", formData.description);
      // Append image only if it's a File object
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.put(`/api/blogs?id=${mongoId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Blog updated successfully!");
        setShowForm(false);
        // Clear form and preview image
        setFormData({ heading: "", description: "", image: "" });
        setImage("");
      } else {
        throw new Error(response.data.error || "Failed to update the blog.");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const deleteTopic = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      const response = await axios.delete(`/api/blogs`, {
        params: { blogId: mongoId, topicId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setLocalTopics((prevTopics) =>
          prevTopics.filter((topic) => topic._id !== topicId)
        );
      } else {
        throw new Error("Failed to delete topic.");
      }
    } catch (error) {
      console.error("Failed to delete topic:", error);
      toast.error("Failed to delete topic.");
    }
  };

  return (
    <>
      {/* Main Blog Row */}
      <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-800 text-center">
        <th className="hidden sm:table-cell px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-200">
          <p className="text-center text-gray-500 dark:text-gray-400">
            {author || "No Author"}
          </p>
        </th>
        <td className="px-4 py-3 font-bold text-base text-gray-900 dark:text-gray-200">
          {title || "No Title"}
        </td>
        <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
          {publishedDisplay}
        </td>
        <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
          {updatedDisplay}
        </td>
        <td
          onClick={() => deleteBlog(mongoId)}
          className="px-4 py-3 text-xl text-red-600 text-center cursor-pointer hover:scale-110 flex justify-center items-center"
        >
          <MdDelete />
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => setShowForm(true)}
            className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-base hover:scale-105"
          >
            Add Topics
          </button>
        </td>
      </tr>

      {/* Topics List with Foldable/Unfoldable Feature */}
      {localTopics.length > 0 ? (
        <tr>
          <td colSpan="6">
            <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              {/* Topics Header with Toggle Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3">
                  Topics:
                </h3>
                <button
                  onClick={() => setShowTopics(!showTopics)}
                  className="p-2 rounded-md transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {showTopics ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {/* Conditionally render topics list */}
              {showTopics && (
                <div className="w-full overflow-x-auto">
                  <ul className="w-full list-none space-y-2">
                    {localTopics.map((topic) => (
                      <li
                        key={topic._id}
                        className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-base text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            Topic
                          </span>
                          <span className="font-medium">{topic.heading}</span>
                        </div>
                        <button
                          onClick={() => deleteTopic(topic._id)}
                          className="p-2 rounded-md transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <MdDelete className="text-red-500 text-xl" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="6" className="text-center text-gray-500 py-3 text-base">
            No topics available.
          </td>
        </tr>
      )}

      {/* Update Form */}
      {showForm && (
        <tr>
          <td colSpan="6" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="block text-sm font-medium dark:text-gray-300">
                  Heading:
                </label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-base"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium dark:text-gray-300">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-base"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-300">
                  Image: (optional)
                </label>
                <label htmlFor="image">
                  <Image
                    className="mt-4"
                    src={image || uploadAreaimg}
                    width={140}
                    height={70}
                    alt="Thumbnail Preview"
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex justify-start gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-5 py-2 rounded-md text-base"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-5 py-2 rounded-md text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
};

export default BlogItems;
