"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function TutorialPage() {
    const { id } = useParams();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        if (!id) return;

        const fetchTutorial = async () => {
            try {
                const response = await axios.get(`/api/tutorialsClient/${id}`);
                setTutorial(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch tutorial");
            } finally {
                setLoading(false);
            }
        };

        fetchTutorial();
    }, [id]);

    if (loading) return <p>Loading tutorial...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const topicsList = tutorial?.topics || [];
    const totalPages = Math.ceil(topicsList.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const paginatedTopics = topicsList.slice(startIndex, startIndex + itemsPerPage);

    const handleScrollToTopic = (topicId) => {
        const topicIndex = topicsList.findIndex((topic) => topic._id === topicId);
        if (topicIndex === -1) return;

        const page = Math.floor(topicIndex / itemsPerPage);
        setCurrentPage(page);

        setTimeout(() => {
            const topicElement = document.getElementById(topicId);
            if (topicElement) {
                topicElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Mobile Sidebar Toggle */}
            <button 
                className="md:hidden p-3 bg-blue-500 text-white w-full text-left" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? "Close Topics" : "Open Topics"}
            </button>

            {/* Sidebar */}
            <aside className={`w-full md:w-1/5 p-4 min-h-screen md:block ${sidebarOpen ? "block" : "hidden"} 
                bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200`}>
                <h2 className="text-xl font-semibold mb-4">Topics</h2>
                <ul className="space-y-2">
                    {topicsList.map((topic) => (
                        <li key={topic._id}>
                            <button
                                onClick={() => handleScrollToTopic(topic._id)}
                                className="w-full  text-left text-gray-700 dark:text-gray-300 font-medium px-2 py-1 
                                    hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
                            >
                                {topic.heading}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="w-full md:w-4/5 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                <div className="border-b-2 mb-6 border-gray-500">
                <h2 className="text-3xl font-bold mb-2">{tutorial?.title}</h2>
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">{tutorial?.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
    Author: {tutorial?.author}
</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
    Last updated: {tutorial?.updatedDate ? new Date(tutorial.updatedDate).toLocaleDateString() : "N/A"}
</p>

                </div>
                <div className="space-y-6">
                    {paginatedTopics.map((topic) => (
                        <div key={topic._id} id={topic._id}>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-2">{topic.heading}</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{topic.description}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
               <div className="flex justify-center mt-6">
              <ReactPaginate
    previousLabel={"← Prev"}
    nextLabel={"Next →"}
    breakLabel={"..."}
    pageCount={totalPages}
    marginPagesDisplayed={1}
    pageRangeDisplayed={2}
    onPageChange={({ selected }) => setCurrentPage(selected)}
    containerClassName={"flex space-x-2"}
    pageClassName={"rounded-md overflow-hidden"} 
    pageLinkClassName={"px-4 py-2 bg-gray-700 text-white hover:bg-green-400 cursor-pointer transition block rounded-md"} 
    activeClassName={"bg-green-500 text-white rounded-md"} 
    activeLinkClassName={"bg-green-500 text-white block px-4 py-2 rounded-md"} 
    previousClassName={"px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 cursor-pointer"}
    nextClassName={"px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 cursor-pointer"}
    breakClassName={"px-4 py-2"}
/>

           </div>
           
               
                )}
            </div>
        </div>
    );
}
