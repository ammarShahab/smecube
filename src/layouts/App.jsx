import { Outlet } from "react-router";
import { HelmetProvider } from "react-helmet-async"; // Add this import
import Header from "../pages/shared/Header";
import Footer from "../pages/shared/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import { useEffect, useState } from "react";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HelmetProvider> {/* Wrap entire app with HelmetProvider */}
      <ScrollToTop />
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrolled={scrolled}
      />

      {/* Add padding-top wrapper here to prevent header from covering content */}
      <main className="pt-20 md:pt-10">
        <Outlet />
      </main>

      <Footer />
    </HelmetProvider>
  );
}

export default App;