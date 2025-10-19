import React from "react";
import Header from "../Header/Header";
import "./Contact.css";
import pandaProfile from "../Assets/panda12.png";
import location from "../Assets/location.png";
import email from "../Assets/email.png";
import phone from "../Assets/phone.png";
const Contact = () => {
  return (
    <div className="ContactWrapper">
      <Header />
      <div className="contentContact">
        <main className="mainContentContact">
          <span className="Panda-Contact-content">
            <img
              src={pandaProfile}
              alt="Panda Contact"
              className="panda-Contact"
            />
          </span>
          <h1>Contact Us</h1>
          <div className="contact-row">
            <div className="contact-column">
              <span className="Contact-location">
                <img
                  src={location}
                  alt="Location Contact"
                  className="Location-Contact"
                />
              </span>
              <h2>LOCATION</h2>
              <p> Timisoara </p>
              <p>Rovinari</p>
            </div>
            <div className="contact-column">
              <span className="Contact-Phone">
                <img
                  src={phone}
                  alt="Phone Contact"
                  className="Phone-Contact"
                />
              </span>
              <h2>PHONE</h2>
              <p>+40790829084</p>
              <p>+40712121212</p>
            </div>
            <div className="contact-column">
              <span className="Contact-email">
                <img
                  src={email}
                  alt="Email Contact"
                  className="Email-Contact"
                />
              </span>
              <h2>EMAIL</h2>
              <p>fabianairimitoaie@gmail.com</p>
              <p>airimitoaiefabian@yahoo.com</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
