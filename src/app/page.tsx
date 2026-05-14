import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import About from "@/components/home/About";
import Features from "@/components/home/Features";
import FAQ from "@/components/home/FAQ";
import Download from "@/components/home/Download";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/home/Footer";
import OpenLibraryFull from "@/components/home/OpenLibraryFull";

export default function Home() {
  return (
    <>
      <Header />
      <SearchBar />
      <OpenLibraryFull />
      <About />
      <Features />
      <FAQ />
      <Download />
      <ContactCTA />
      <Footer />
    </>
  );
}
