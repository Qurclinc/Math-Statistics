import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}