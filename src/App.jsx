import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import ModalWatch from "./components/modal/ModalWatch";
import Footer from "./components/navbar/Footer";
import DetailMovie from "./pages/detailMovie/DetailMovie";
import SearchMovie from "./pages/searchMovie/SearchMovie";
import AllMovie from "./pages/allMovie/AllMovie";
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detailMovie/:id" element={<DetailMovie />} />
          <Route path="/allMovie" element={<AllMovie />} />
          <Route path="/searchMovie/:search" element={<SearchMovie />} />
        </Routes>
      </div>
      <ModalWatch />
      <Footer/>
    </Router>
  );
}

export default App;
