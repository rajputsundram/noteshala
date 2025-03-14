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
  }, [router]);

  if (isLoading)
    return (
      <p className="w-full text-center text-lg mt-8 dark:text-white">
        Loading...
      </p>
    );

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 py-10 font-sans text-gray-800 dark:bg-black dark:text-white">
      <h1 className="text-4xl text-center font-bold text-blue-900 dark:text-blue-200 mb-6">
        Admin Dashboard
      </h1>
      {isAdmin ? (
        <p className="text-center text-2xl text-green-700 dark:text-green-400 mb-8">
          Welcome, Admin!
        </p>
      ) : (
        <p className="text-center text-2xl text-red-600 dark:text-red-400 mb-8">
          Redirecting...
        </p>
      )}

      {/* Begin Detailed Instructions */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-300">
          Noteshala Admin Panel Instructions for Teachers
        </h2>
        <p className="text-lg leading-relaxed">
          Noteshala is a dynamic platform where students access their study materials and teachers upload content.
          This guide is specifically for teachers with admin access to help you navigate the admin panel and manage resources.
        </p>

        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          1. Accessing the Admin Panel
        </h3>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Authentication &amp; Authorization:</strong> Teachers must log in using their credentials.
            The system verifies your admin status via an API call and redirects you if authentication fails or you are not an admin.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          2. Key Features and How to Use Them
        </h3>

        {/* Feature A: Add Resources */}
        <h4 className="text-xl font-bold text-green-600 dark:text-green-400">
          A. Add Resources
        </h4>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Feature:</strong> Add new educational resources.
          </li>
          <li>
            <strong>How to Create:</strong>
            <ol className="list-decimal ml-8">
              <li>Navigate to the “Add Resources” section in the admin panel.</li>
              <li>Upload a thumbnail image that represents the resource.</li>
              <li>Upload the resource file in PDF format.</li>
              <li>Provide a meaningful title for the resource.</li>
              <li>Enter a detailed description about the content.</li>
              <li>Include the name of the author.</li>
              <li>Specify the department, year, semester, and appropriate categories.</li>
            </ol>
          </li>
          <li>
            <strong>Note:</strong> To view or delete your existing resources, navigate to the "List Resources" page.
          </li>
        </ul>

        {/* Feature B: Add Tutorials */}
        <h4 className="text-xl font-bold text-green-600 dark:text-green-400">
          B. Add Tutorials
        </h4>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Feature:</strong> Create text-based tutorials.
          </li>
          <li>
            <strong>How to Create:</strong>
            <ol className="list-decimal ml-8">
              <li>Navigate to the “Add Tutorials” page.</li>
              <li>
                Create a new tutorial by uploading a thumbnail, providing a title, and adding a detailed description.
              </li>
              <li>Include the author’s name, department, year, and semester.</li>
              <li>
                After creating the tutorial, visit the “List Tutorials” page to manage your tutorials.
              </li>
              <li>
                Start adding topics—for example, add "Introduction of Java" as the first topic.
              </li>
              <li>
                You can remove a topic if you make a mistake or remove the entire tutorial if needed.
              </li>
              <li>
                To expand the topics list, click on the tutorial and use the "Add Topic" form.
                <span className="block mt-1">
                  <strong>Note:</strong> Adding an image in the topic form is optional but helps visualize the content.
                </span>
              </li>
            </ol>
          </li>
        </ul>

        {/* Feature C: Blog Posts */}
        <h4 className="text-xl font-bold text-green-600 dark:text-green-400">
          C. Blog Posts
        </h4>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Feature:</strong> Write and manage blog posts related to educational topics.
          </li>
          <li>
            <strong>How to Create:</strong>
            <ol className="list-decimal ml-8">
              <li>Navigate to the “Blog” section in the admin panel.</li>
              <li>
                Upload a thumbnail image and provide a meaningful title for your blog post.
              </li>
              <li>
                Enter a detailed description and add additional bullet points to highlight key aspects.
              </li>
              <li>
                Include the author’s name and the department.
              </li>
            </ol>
          </li>
          <li>
            <strong>Note:</strong> Year and semester details are not required for blog posts.
          </li>
          <li>
            <strong>Management:</strong> To view, edit, or delete your blog posts, navigate to the "List Blog Posts" page.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          3. Teacher Responsibilities on Noteshala
        </h3>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Content Quality:</strong> Ensure all materials are accurate, well-organized, and adhere to platform guidelines.
          </li>
          <li>
            <strong>Timeliness:</strong> Upload and update resources promptly to reflect current curricula and schedules.
          </li>
          <li>
            <strong>Organization:</strong> Correctly categorize and label each resource for easy access by students.
          </li>
          <li>
            <strong>Engagement:</strong> Monitor student feedback and update content as necessary.
          </li>
          <li>
            <strong>Compliance:</strong> Follow all content policies, ethical standards, and academic integrity guidelines.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Final Reminders
        </h3>
        <ul className="list-disc ml-8 text-lg">
          <li>
            <strong>Always Double-Check:</strong> Verify that all information is accurate and clear before publishing any resource.
          </li>
          <li>
            <strong>Consistency is Key:</strong> Use consistent formatting and categorization across all resources.
          </li>
          <li>
            <strong>Seek Support:</strong> Refer to the platform’s support documentation or contact the administrator if you encounter any issues.
          </li>
          <li>
            <strong>Contact:</strong> If you experience any difficulty, please email us at{" "}
            <a href="mailto:noteshala787@gmail.com" className="underline text-blue-500 dark:text-blue-400">
              noteshala787@gmail.com
            </a>
            .
          </li>
        </ul>
        <p className="text-lg">
          Happy teaching and thank you for contributing to Noteshala!
        </p>
      </section>
      {/* End Detailed Instructions */}
    </div>
  );
}
