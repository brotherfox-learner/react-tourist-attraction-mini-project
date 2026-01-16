import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import TravelCard from "./TravelCard";
import { debounce } from "lodash";

export default function TravelCardList({ searchQuery, setSearchQuery }) {
  const [travels, setTravels] = useState([]);

  const fetchTravels = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchQuery}`
      );
      setTravels(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query) => fetchTravels(query), 500, {
      trailing: true,
      maxWait: 2000,
    }),
    []
  );

  useEffect(() => {
    debouncedFetch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      {travels.length > 0 ? (
        travels.map((travel, index) => (
          <div key={travel.eid} style={{ animationDelay: `${index * 0.1}s` }}>
            <TravelCard travel={travel} setSearchQuery={setSearchQuery} />
          </div>
        ))
      ) : (
        <div className="text-center py-20 animate-[fadeInUp_0.6s_ease-out]">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            ไม่พบสถานที่ท่องเที่ยว
          </h3>
          <p className="text-gray-500">ลองค้นหาด้วยคำอื่นดูนะ</p>
        </div>
      )}
    </div>
  );
}
