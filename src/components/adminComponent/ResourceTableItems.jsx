"use client";

import React from "react";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns"; // Optional library for consistent formatting

const ResourceTableItems = ({ title, author, date, deleteResource, mongoId }) => {
  const timestamp = Number(date); // Ensure consistent format
  const ResourceDate = new Date(timestamp);

  const displayDate = isNaN(ResourceDate)
    ? "Invalid Date"
    : format(ResourceDate, "yyyy-MM-dd HH:mm:ss"); // Consistent date format

  console.log("Received date:", date);

  return (
    <tr className=" border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <p className="text-gray-400">{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "no title"}</td>
      <td className="px-6 py-4">{displayDate}</td>
      <td
        onClick={() => deleteResource(mongoId)}
        className="px-6 text-2xl text-red-700 py-4 cursor-pointer"
      >
        <MdDelete />
      </td>
    </tr>
  );
};

export default ResourceTableItems;
