export default function ThumbnailPhoto({ photo, travel, index }) {
  return (
    <>
      <img
        src={photo}
        alt={`${travel.title} ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 drop-shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
          />
        </svg>
      </div>{" "}
    </>
  );
}
