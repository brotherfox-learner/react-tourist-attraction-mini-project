export default function TagChip({ tag, index, removeTag }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-[scaleIn_0.2s_ease-out] group/tag"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span>{tag}</span>
      <button
        onClick={() => removeTag(tag)}
        type="button"
        className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors duration-200"
        aria-label={`ลบ ${tag}`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}
