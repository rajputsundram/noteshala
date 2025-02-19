"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const TutorialsItems = ({
  title,
  author,
  updatedDate,
  publishedDate,
  deleteResource,
  mongoId,
  description,
  imageUrl,
  topics = [],
}) => {
  const uploadAreaimg = "/images/upload_area.png";
  const [image, setImage] = useState(imageUrl || "");
  const [showForm, setShowForm] = useState(false);
  const [localTopics, setLocalTopics] = useState(topics);
  const [formData, setFormData] = useState({
    heading: title || "",
    description: description || "",
    image: imageUrl || "",
  });

  // Format dates if valid
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return isNaN(dateObj) ? "Invalid Date" : format(dateObj, "yyyy-MM-dd HH:mm:ss");
  };

  const formattedPublishedDate = formatDate(publishedDate);
  const formattedUpdatedDate = formatDate(updatedDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mongoId) {
      toast.error("Invalid tutorial ID.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("description", formData.description);

      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.put(`/api/addtutorials?id=${mongoId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success("Tutorial updated successfully!");

        if (response.data.updatedTutorial && response.data.updatedTutorial.topics) {
          setLocalTopics(response.data.updatedTutorial.topics);
        }

        setShowForm(false);
      } else {
        throw new Error(response.data.error || "Failed to update the tutorial.");
      }
    } catch (error) {
      console.error("Failed to update tutorial:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const deleteTopic = async (topicId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this topic?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`/api/addtutorials`, {
        params: { tutorialId: mongoId, topicId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setLocalTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== topicId));
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
      <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 text-center">
        <th className="hidden sm:table-cell px-6 py-4 text-lg font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-200">
          <p className="text-gray-500 dark:text-gray-400">{author || "No Author"}</p>
        </th>

        <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-bold text-lg uppercase tracking-wide">
          {title || "No Title"}
        </td>

        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wide">
          {formattedPublishedDate}
        </td>
        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wide">
          {formattedUpdatedDate}
        </td>

        <td
          onClick={() => deleteResource(mongoId)}
          className="px-6 py-4 text-2xl text-red-600 dark:text-red-400 cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <MdDelete />
        </td>

        <td className="px-6 py-4">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-md shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold uppercase tracking-wide rounded-md text-sm px-6 py-3 transition-all duration-200 hover:scale-105"
          >
            Add Topics
          </button>
        </td>
      </tr>

      {localTopics.length > 0 ? (
        <tr>
          <td colSpan="5">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Topics:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {localTopics.map((topic) => (
                  <li
                    key={topic._id}
                    className="flex justify-between items-center px-6 py-2 border-b border-gray-300 dark:border-gray-700 shadow-md rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Topic
                      </span>
                      <span className="text-lg font-medium">{topic.heading}</span>
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
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="5" className="text-center text-gray-500 py-3">
            No topics available.
          </td>
        </tr>
      )}

      {showForm && (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-300">Heading:</label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-300">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-300">Image: (optional)</label>
                <label htmlFor="image">
                  <Image className="mt-4" src={image || uploadAreaimg} width={140} height={70} alt="Thumbnail Preview" />
                </label>
                <input type="file" id="image" hidden onChange={handleImageChange} />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-md transition-all duration-200">
                  Save
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 dark:bg-gray-600 text-white px-6 py-3 rounded-md transition-all duration-200">
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

export default TutorialsItems;
