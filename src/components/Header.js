import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 position-sticky">
      <div className="container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="text-white mt-4 mb-4">Simple Blogs Display</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
