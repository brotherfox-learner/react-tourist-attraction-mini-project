import TagChip from "./TagChip";

export default function Header({
  selectedTags,
  searchText,
  onSearchTextChange,
  removeTag,
}) {
  return (
    <header className="mb-12 animate-[fadeInUp_0.6s_ease-out] font-thai">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent animate-[scaleIn_0.8s_ease-out] hover:scale-105 transition-transform duration-300 max-sm:text-4xl text-center py-5">
        เที่ยวไหนดี
      </h1>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-0">
        <div className="relative">
          <label className="block text-black text-md mb-2 font-medium">
            ค้นหาที่เที่ยว
          </label>


          {/* Input สำหรับพิมพ์ค้นหาเพิ่มเติม */}
          <div className="relative">
            <input
              type="text"
              className="w-full pb-3 px-0 pr-8 text-lg bg-transparent border-0 border-b border-gray-300 outline-none transition-all duration-300 focus:border-blue-400 placeholder:text-gray-400 focus:placeholder:text-blue-400 placeholder:text-center text-center"
              placeholder={
                selectedTags.length > 0
                  ? "ไปไหนอีกดีไหมนะ..."
                  : "หาที่เที่ยวแล้วไปกัน ..."
              }
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
            />
            {searchText && (
              <button
                onClick={() => onSearchTextChange("")}
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group/clear"
                aria-label="Clear search text"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover/clear:text-red-500 transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          
          {/* แสดง Tags ที่เลือกเป็น Chips */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6 animate-[fadeInUp_0.3s_ease-out]">
              <span className="text-gray-500 text-sm self-center">
                กำลังค้นหา:
              </span>
              {selectedTags.map((tag, index) => (
                <TagChip
                  key={tag}
                  tag={tag}
                  index={index}
                  removeTag={removeTag}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </header>
  );
}
