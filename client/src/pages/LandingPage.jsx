import { useState } from "react";
import Header from "../components/Header";
import TravelCardList from "../components/TravelCardList";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TravelCardList searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}