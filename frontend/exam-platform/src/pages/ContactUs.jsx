import { useState } from "react";
import "../css/contactus.css";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
    
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}

export default ContactUs;