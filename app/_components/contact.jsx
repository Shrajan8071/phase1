"use client"
import { db } from "@/utils/db";
import { contacts } from "@/utils/schema";
import moment from "moment/moment";
import React, { useState } from "react";
import { LoaderCircle } from 'lucide-react';

const Contact = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, email, phone, message);


    // console.log("Form Submitted:", formData);
    try{
        const resp = await db.insert(contacts)
        .values({
            name:name,
            email:email,
            phone:phone,
            message:message
            
        }).execute();

        setSuccess(true);
    }catch (error) {
        console.error("Error:", error);
        alert("Failed to send message.");
      } finally {
        setLoading(false); 
      }
    
  };

  return (
    <div className="m-auto w-[90%] max-w-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="name"
          
          onChange={(event)=>setName(event.target.value)}
          required
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your name"
        />

        <input
          type="email"
          name="email"
         
          onChange={(event)=>setEmail(event.target.value)}
          required
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
        />

        <input
          type="tel"
          name="phone"
    
          onChange={(event)=>setPhone(event.target.value)}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your phone number" required
        />

        <textarea
          name="message"
         
          onChange={(event)=>setMessage(event.target.value)}
          required
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your message" 
          rows="4"
        ></textarea>

       
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}

          >
            {loading? <><LoaderCircle className='animate-spin'/></>:'Send Message'}
          </button>
          
        </div>
      </form>
      {success && (
        <div className="text-center text-green-600 mt-4">
          Someone from our team will reach out to you shortly.
        </div>
      )}
    </div>
  );
};

export default Contact;
