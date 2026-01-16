import ReadMore from "./ReadMore";

export default function LightBox({
  selectedImage,
  travel,
  currentImageIndex,
  displayPhotos,
  closeLightbox,
  navigateImage,
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 animate-[fadeInUp_0.3s_ease-out] backdrop-blur-sm"
      onClick={closeLightbox}
    >
      {/* Close button */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group/close z-50"
      >
        <svg
          className="w-8 h-8 text-white group-hover/close:rotate-90 transition-transform duration-300"
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

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateImage("prev");
        }}
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group/nav z-50"
      >
        <svg
          className="w-8 h-8 text-white group-hover/nav:-translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateImage("next");
        }}
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group/nav z-50"
      >
        <svg
          className="w-8 h-8 text-white group-hover/nav:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white font-medium backdrop-blur-md z-50">
        {currentImageIndex + 1} / {displayPhotos.length}
      </div>

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-[90vh] mx-4 animate-[scaleIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedImage}
          alt={travel.title}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Image caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <h3 className="text-white text-xl font-bold mb-2">
            {travel.title}{" "}
              <ReadMore url={travel.url} className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium text-2xl underline transition-all duration-300 self-start group/link hover:gap-1" />
          </h3>
          <p className="text-white/80 text-sm">คลิกนอกรูปหรือกด ESC เพื่อปิด</p>
        </div>
      </div>
    </div>
  );
}
