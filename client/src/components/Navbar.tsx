import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const user = false;

  const handleNavbarOpen = () => {
    setNavbarVisible(true);
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = "hidden";
  };

  const handleNavbarClose = () => {
    setNavbarVisible(false);
    // Restore body scrolling when mobile menu is closed
    document.body.style.overflow = "auto";
  };

  const handleLinkClick = () => {
    // Close the navbar and restore body scroll when a link is clicked on mobile
    if (window.innerWidth < 768) {
      handleNavbarClose();
    }
  };
  const loginWithGoogle = () =>{
    window.open("http://localhost:3000/auth/google","_self")
  }
  return (
    <header className="relative p-2 text-lg">
      <nav className="w-[90%] mx-auto flex md:flex-row flex-col md:gap-0 gap-6 justify-between items-center text-gray-300 bg-[#21263C]/90 p-2 border border-slate-500 rounded-lg">
        <h1 className="text-2xl font-bold">
          <a href="/">Brand Logo</a>
        </h1>

        {/* Mobile Menu Toggle */}
        <div className="absolute z-50 md:hidden left-2">
          <button
            className={`border py-1 px-2 absolute left-2 ${
              navbarVisible
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={handleNavbarOpen}
          >
            Open
          </button>
          <button
            className={`border py-1 px-2 absolute left-2 ${
              !navbarVisible
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={handleNavbarClose}
          >
            Close
          </button>
        </div>

        {/* Navigation Menu */}
        <ul
          className={`
            md:flex md:flex-row flex-col items-center font-medium gap-6
            fixed md:relative
            top-0 left-0 right-0 bottom-0
            md:top-auto md:left-auto
            w-full h-full
            bg-[#21263C]
            md:w-auto md:h-auto
            transform transition-transform duration-300 ease-in-out
            ${navbarVisible ? "translate-x-0" : "translate-x-full"}
            md:translate-x-0
            flex items-center justify-center
            z-40
          `}
        >
          <li className="my-4 md:my-0">
            <Link to="/" className="hover:text-white" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="my-4 md:my-0">
            <Link to="/about" className="hover:text-white" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="my-4 md:my-0">
            <Link to="/contact" className="hover:text-white" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          <li className="my-4 md:my-0">
            <Link to="/pricing" className="hover:text-white" onClick={handleLinkClick}>
              Pricing
            </Link>
          </li>
          <li className="my-4 md:my-0">
            <Link
              to="/dashboard"
              className="hover:text-white"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
          </li>
          {user?<li className="my-4 md:my-0">
            <Link
              to="/"
              className="hover:text-white"
              onClick={handleLinkClick}
            >
              Sign Out
            </Link>
          </li>:<li className="my-4 md:my-0">
            <Link
              to="/"
              className="hover:text-white"
              onClick={loginWithGoogle}
            >
              SignIn
            </Link>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;