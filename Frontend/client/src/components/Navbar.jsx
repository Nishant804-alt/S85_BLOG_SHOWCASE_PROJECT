import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { BiMenu } from "react-icons/bi";


const navLinks = [
  { path: "/", display: "Home" },
  { path: "/blogs", display: "Blogs" },
  { path: "/blogs/create", display: "Create a Blog" },
  { path: "/contact", display: "Contact" },
];

const Navbar = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Sticky header
  useEffect(() => {
    const handleStickyHeader = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle("sticky__header", window.scrollY > 80);
      }
    };
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  // Toggle Menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
      setUser(null);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Optionally load user on mount (comment if unnecessary)
  useEffect(() => {
    // Example: fetch user info from API
    setUser("Nishant");
  }, []);

  return (
    <header ref={headerRef} className="header fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-black">Blogify</Link>

          {/* Desktop Menu */}
          <nav className={`hidden md:flex items-center gap-8 ${isMenuOpen ? "block" : ""}`}>
            {navLinks.map(({ path, display }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-primaryColor font-semibold" : "text-black hover:text-primaryColor"
                }
              >
                {display}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <button className="bg-primaryColor text-white py-2 px-4 rounded-full">
                  {user}
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md py-2 hidden group-hover:block z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-semibold rounded-full">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <span className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <AiOutlineClose className="text-2xl cursor-pointer" />
              ) : (
                <BiMenu className="text-2xl cursor-pointer" />
              )}
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="flex flex-col gap-4 mt-4 md:hidden items-start">
            {navLinks.map(({ path, display }) => (
              <NavLink
                key={path}
                to={path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primaryColor font-semibold" : "text-black hover:text-primaryColor"
                }
              >
                {display}
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      {/* Optional Scoped CSS */}
      <style>{`
        .sticky__header {
          background-color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .bg-primaryColor {
          background-color: #007bff;
        }
        .text-primaryColor {
          color: #007bff;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
