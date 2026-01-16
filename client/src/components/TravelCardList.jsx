import axios from "axios";
import { useState, useEffect } from "react";
import TravelCard from "./TravelCard";

export default function TravelCardList({ searchQuery }) {
  const [travels, setTravels] = useState([]);

  const fetchTravels = async () => {
    try {
      const response = await axios.get("http://localhost:4001/trips?keywords");
      setTravels(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  const filteredTravels = travels.filter((travel) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();

    return (
      travel.title.toLowerCase().includes(searchLower) ||
      travel.description.toLowerCase().includes(searchLower) ||
      travel.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="travel-card-list">
      {filteredTravels.map((travel) => (
        <TravelCard key={travel.eid} travel={travel} />
      ))}
    </div>
  );
}
