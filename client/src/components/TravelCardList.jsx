import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import TravelCard from "./TravelCard";
import { debounce } from "lodash";

export default function TravelCardList({ searchText, selectedTags, addTag, removeTag }) {
  const [travels, setTravels] = useState([]);

  // Fetching data from the API
  const fetchTravels = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${query || ""}`
      );
      setTravels(response.data.data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };
  // Debouncing the fetchTravels function
  const debouncedFetch = useCallback(
    debounce((query) => fetchTravels(query), 500, {
      trailing: true,
      maxWait: 2000,
    }),
    []
  );

  useEffect(() => {
    debouncedFetch(searchText);
  }, [searchText]);

  // กรองผลลัพธ์ตาม selectedTags (client-side)
  const filteredTravels = useMemo(() => {
    if (selectedTags.length === 0) return travels;
    
    // แสดงเฉพาะ post ที่มี tag ทุกตัวที่เลือก
    return travels.filter((travel) =>
      selectedTags.every((tag) => travel.tags.includes(tag))
    );
  }, [travels, selectedTags]);

  return (
    <section className="flex flex-col gap-8">
      {filteredTravels.length > 0 ? (
        // กรณีที่มีผลลัพธ์
        filteredTravels.map((travel, index) => (
          <article key={travel.eid} style={{ animationDelay: `${index * 0.1}s` }}>
            <TravelCard
              travel={travel}
              selectedTags={selectedTags}
              addTag={addTag}
              removeTag={removeTag}
            />
          </article>
        ))
      ) : (
        // กรณีที่ไม่มีผลลัพธ์
        <div className="text-center py-20 animate-[fadeInUp_0.6s_ease-out]">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            ไม่พบสถานที่ท่องเที่ยว
          </h3>
          <p className="text-gray-500">
            {selectedTags.length > 0
              ? "ลองเอาตัวกรองหมวดหมู่ออก หรือค้นหาด้วยคำอื่นดูนะ"
              : "ลองค้นหาด้วยคำอื่นดูนะ"}
          </p>
        </div>
      )}
    </section>
  );
}
