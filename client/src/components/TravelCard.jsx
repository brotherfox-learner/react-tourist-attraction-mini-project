import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { copyUrl } from "../lib/utils";
import MainPhoto from "./MainPhoto";
import ThumbnailPhoto from "./ThumbnailPhoto";
import LightBox from "./LightBox";
import CopyUrlIcon from "./CopyUrlIcon";
import SuccesIcon from "./SuccesIcon";
import ReadMore from "./ReadMore";

export default function TravelCard({
  travel,
  selectedTags,
  addTag,
  removeTag,
}) {
  const displayPhotos = travel.photos.slice(0, 4);
  const mainPhoto = displayPhotos[0];
  const thumbnails = displayPhotos.slice(1);
  const [copied, setCopied] = useState(false); // สถานะของการคัดลอก URL
  const [selectedImage, setSelectedImage] = useState(null); // รูปภาพที่เลือก
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // index ของรูปภาพที่เลือก

  // Handle copying the URL
  const handleCopyUrl = async () => {
    const success = await copyUrl(travel.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle opening the lightbox
  const openLightbox = (e, imageUrl, index) => {
    e.stopPropagation(); // ป้องกัน event bubbling
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  // Handle closing the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Handle navigating the image
  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % displayPhotos.length
        : (currentImageIndex - 1 + displayPhotos.length) % displayPhotos.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(displayPhotos[newIndex]);
  };

  // Handle keyboard navigation in the lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden"; // ล็อค scroll เมื่อเปิด modal
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset"; // ปลดล็อคเมื่อปิด modal
    };
  }, [selectedImage]);

  // Render the TravelCard component
  return (
    <div className="group grid grid-cols-[300px_1fr_auto] gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 relative animate-[fadeInUp_0.6s_ease-out] hover:-translate-y-1 max-lg:grid-cols-1 border border-gray-100 overflow-hidden font-thai">
      {/* Gradient overlay animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main photo */}
      <div
        onClick={(e) => openLightbox(e, mainPhoto, 0)}
        className="relative w-full h-64 rounded-xl overflow-hidden max-lg:h-52 shadow-md group-hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
      >
        <MainPhoto mainPhoto={mainPhoto} travel={travel} />
      </div>

      {/* Travel information */}
      <div className="relative flex flex-col gap-3 z-10">
        {/* Title */}
        <h2 className="text-2xl font-medium text-gray-800 leading-tigh transition-colors duration-300 max-sm:text-xl">
          {travel.title}
        </h2>
        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
          {travel.description.length > 100
            ? `${travel.description.substring(0, 100)}...`
            : travel.description}
        </p>
        {/* Read more button */}
        <ReadMore url={travel.url} className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-700 font-medium text-sm transition-all duration-300 self-start group/link hover:gap-2" />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-gray-500 text-sm font-medium">หมวด</span>
          {travel.tags.map((tag, index) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <span key={index} className="inline-flex items-center">
                <button
                  onClick={() => (isSelected ? removeTag(tag) : addTag(tag))}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-50 text-blue-400 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {isSelected && <span className="inline-block mr-1">✓</span>}
                  {tag}
                </button>
                {index < travel.tags.length - 1 && (
                  <span className="text-gray-400 mx-1">·</span>
                )}
              </span>
            );
          })}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {thumbnails.map((photo, index) => (
            <div
              key={index}
              onClick={(e) => openLightbox(e, photo, index + 1)}
              className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-zoom-in group/thumb max-sm:w-16 max-sm:h-16"
            >
              <ThumbnailPhoto photo={photo} travel={travel} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Copy URL button */}
      <div className="relative flex items-center justify-center max-lg:absolute max-lg:top-6 max-lg:right-6 z-10">
        <button
          onClick={handleCopyUrl}
          type="button"
          title={copied ? "คัดลอกแล้ว!" : "คัดลอก URL"}
          disabled={copied}
          className={`
            relative p-3 rounded-full border-2 transition-all duration-300 max-sm:p-1 max-sm:m-2 max-lg:p-2 max-lg:m-2 cursor-pointer
            ${
              copied
                ? "bg-green-500 border-green-500 scale-110"
                : "bg-white border-blue-400 hover:bg-blue-50 hover:scale-110 hover:rotate-12"
            }
            disabled:cursor-not-allowed shadow-lg hover:shadow-xl
            group/button
          `}
        >
          {copied ? <SuccesIcon /> : <CopyUrlIcon />}
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedImage &&
        createPortal(
          <LightBox
            selectedImage={selectedImage}
            travel={travel}
            currentImageIndex={currentImageIndex}
            displayPhotos={displayPhotos}
            closeLightbox={closeLightbox}
            navigateImage={navigateImage}
          />,
          document.body
        )}
    </div>
  );
}
