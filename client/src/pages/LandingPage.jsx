import { useState } from "react";
import Header from "../components/Header";
import TravelCardList from "../components/TravelCardList";

export default function LandingPage() {
  const [selectedTags, setSelectedTags] = useState([]); // Tags สำหรับกรอง (client-side)
  const [searchText, setSearchText] = useState(""); // ข้อความสำหรับ fetch

  // เพิ่ม tag (ไม่ซ้ำ)
  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // ลบ tag
  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header
        selectedTags={selectedTags}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        removeTag={removeTag}
      />
      <TravelCardList
        searchText={searchText}
        selectedTags={selectedTags}
        addTag={addTag}
        removeTag={removeTag}
      />
    </main>
  );
}