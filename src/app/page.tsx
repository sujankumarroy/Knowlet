import Header from "./components/home/Header";
import SearchBar from "./components/home/SearchBar";
import Library from "./components/home/Library";
import About from "./components/home/About";
import Features from "./components/home/Features";
import FAQ from "./components/home/FAQ";
import Download from "./components/home/Download";
import ContactCTA from "./components/home/ContactCTA";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Library />
      <About />
      <Features />
      <FAQ />
      <Download />
      <ContactCTA />
      <Footer />
    </div>
  );
}
