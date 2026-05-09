import Hero from "@/app/components/home/Header";
import SearchBar from "./components/home/SearchBar";
import Library from "./components/home/Library";

export default function Home() {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Library />
    </div>
  );
}
