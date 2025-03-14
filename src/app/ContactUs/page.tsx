'use client'
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+91) 8684961182",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "rajputsundram87@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Panipat, Haryana",
  },
];

const Contact = () => {
  const [selectedService, setSelectedService] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("service", selectedService);
    formData.append("access_key", "a546a481-e551-4b21-8993-eb7dd76797a5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();
    if (result.success) {
      console.log(result);
      // Clear the form fields
      event.target.reset();
      setSelectedService("");
      // Show success toast with updated message
      toast.success("Your message has been received. We'll get back to you soon!", { position: "top-right" });
    }
  }

  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 justify-center items-center">
          {/* Contact Form */}
          <div className="xl:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-3xl text-green-400">Contact Noteshala</h3>
              <p className="text-white/60">
                We’re here to help. Please fill out the form below with your inquiry, feedback, or support request,
                and our team will get back to you as soon as possible.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  className="p-2 bg-gray-700 rounded"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  className="p-2 bg-gray-700 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="p-2 bg-gray-700 rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              
              <select
                className="p-2 bg-gray-700 rounded"
                onChange={(e) => setSelectedService(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  How can we help you?
                </option>
                <option value="access-issues">Access Issues</option>
                <option value="feedback">Feedback</option>
                <option value="general-inquiry">General Inquiry</option>
              </select>
              
              <textarea
                name="message"
                placeholder="Enter your message here..."
                className="h-32 p-2 bg-gray-700 rounded"
                required
              ></textarea>
              <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-green-500  px-4 py-3 rounded text-white hover:bg-green-600"
              >
                Send Message
              </button>
              </div>
            </form>
          </div>

       
        </div>
      </div>
   
    </section>
  );
};

export default Contact;
