import { useState } from "react";
import Header from "../components/Header";
import TravelCardList from "../components/TravelCardList";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="landing-page">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TravelCardList searchQuery={searchQuery} />
    </div>
  );
}