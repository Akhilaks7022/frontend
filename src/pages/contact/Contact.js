import React, { useState } from "react";
import { Checkbox, message } from "antd";
import "./contact.css";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    products: [],
    message: "",
  });


const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    // Validate name to allow only letters
    const isValidName = /^[A-Za-z\s]*$/.test(value);
    if (!isValidName) {
      message.error("Name can only contain letters and spaces.");
      return;
    }
    
    // Capitalize the first letter
    const cleanedValue = value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
    setFormData({ ...formData, [name]: cleanedValue });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const handleCheckboxChange = (checkedValues) => {
  setFormData({ ...formData, products: checkedValues });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://swastha.onrender.com/contact/add",
        formData
      );
      console.log("Contact form submitted:", response.data);
      message.success("Thank you for reaching out to us");

      // Clear the form inputs after successful submission
      setFormData({
        name: "",
        email: "",
        products: [],
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      message.error("Failed to submit contact form. Please try again later.");
    }
  };
  
  
  return (
  <section className="contact-us-section">
    <div className="contact-info">
      <h1 className="heading-contact">Contact Us</h1>
        <p className="getintouch-contact">
          Get in touch with us
          <br /><br />
        </p>
        <p>
          <strong>ADDRESS:</strong> #309/5, J.K. Pride , 2nd Floor,40th Cross <br /> Jayanagar 8th Block{" "}
          <br /> Bengaluru - 560082
          <br /> Karnataka, India
        </p>
        <p>
          <strong>PHONE:</strong> +91 9482661658 <br />
          &emsp;&emsp;&emsp;&nbsp; +91 8747893662
        </p>
        <p>
          <strong>E-MAIL:</strong> info@atmaparikshan.com
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="checkboxGroup">
            Which product are you interested in?{" "}
          </label>
          <Checkbox.Group onChange={handleCheckboxChange} value={formData.products}>
            <Checkbox
              value="Swastha Medical"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
                marginRight: "10px",
              }}
            >
              Swastha Medical
            </Checkbox>
            <Checkbox
              value="Swastha Hospital"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
                marginRight: "10px",
              }}
            >
              Swastha Hospital
            </Checkbox>
            <Checkbox
              value="Swastha Stree"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
                marginRight: "10px",
              }}
            >
              Swastha Stree
            </Checkbox>
            <Checkbox
              value="Swastha Vahan"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
                marginRight: "10px",
              }}
            >
              Swastha Vahan
            </Checkbox>
          </Checkbox.Group>

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="3"
            required
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
