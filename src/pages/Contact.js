import React from 'react';
import './Contact.css'; // Ensure this CSS file exists and is correctly imported

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container">
        <h1 style={{ color: 'White' }}>Contact Me</h1>
        <p style={{ color: 'White' }}>Feel free to reach out to me through the form below.</p>
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
          
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" required></textarea>
          
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;