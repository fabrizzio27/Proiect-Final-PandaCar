import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import pandaIcon from "../Assets/panda3.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="header">
      <span className="brand-name">
        <img src={pandaIcon} alt="Panda Icon" className="panda-icon" />
        PandaCar
      </span>
      <nav className="nav-bar">
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div
          className={`nav-buttons ${isOpen ? "mobile-open" : ""}`}
          onClick={closeMenu}
        >
          <Link to="/home" className="nav-button">
            Home
          </Link>
          <Link to="/cars" className="nav-button">
            Cars
          </Link>
          <Link to="/favorites" className="nav-button">
            Favorites
          </Link>
          <Link to="/recommendations" className="nav-button">
            Recommendations
          </Link>
          <Link to="/cart" className="nav-button">
            Cart
          </Link>
          <Link to="/contact" className="nav-button">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
