import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 w-full px-5 md:px-10 py-4 transition-all duration-300 ${
        scrollY > 50
          ? "bg-primary/80 shadow-md backdrop-blur-lg"
          : "bg-transparent shadow-md"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <h1 className="font-[900] text-2xl md:text-3xl text-fourth font-poppins drop-shadow-lg">
            FAKBMOVIE
          </h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-fourth focus:outline-none"
          >
            {isMenuOpen ? (
              <MdClose className="text-3xl" />
            ) : (
              <MdMenu className="text-3xl" />
            )}
          </button>
        </div>

        {/* Search Input and Menu Buttons for Desktop */}
        <div className="hidden md:flex items-center space-x-4 w-full md:justify-end">
          {/* Search Input */}
          <form
            action=""
            className="hidden md:flex items-center space-x-4 w-full md:justify-end"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/searchMovie/${search}`);
            }}
          >
            <div className="relative w-1/3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                className="w-full py-2 px-4 rounded-full border border-fourth bg-second focus:outline-none focus:ring-2 focus:ring-fourth"
              />
            </div>
          </form>

          {/* Menu Buttons */}
          <button onClick={()=>navigate("/allMovie")} className="hover:scale-105 bg-fourth/80 hover:bg-fourth text-second font-semibold px-4 rounded-full transition-all">
            MOVIE
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-primary/90 shadow-lg rounded-lg p-4">
          {/* Search Input for Mobile */}
          <div className="w-full mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full py-2 px-4 rounded-full border border-fourth bg-second focus:outline-none focus:ring-2 focus:ring-fourth"
            />
          </div>

          {/* Menu Button for Mobile */}
          <button
            onClick={() => navigate("/allMovie")}
            className="w-full bg-fourth/80 hover:bg-fourth text-second font-semibold py-2 rounded-full transition-all"
          >
            MOVIE
          </button>
        </div>
      )}
    </div>
  );
}
