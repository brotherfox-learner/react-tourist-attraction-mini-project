import { useState } from 'react';
import { copyUrl } from '../lib/utils';

export default function TravelCard({ travel }) {
  const displayPhotos = travel.photos.slice(0, 4);
  const mainPhoto = displayPhotos[0];
  const thumbnails = displayPhotos.slice(1);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    const success = await copyUrl(travel.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="travel-card">
      <div className="card-image-container">
        <img src={mainPhoto} alt={travel.title} className="main-image" />
      </div>

      <div className="card-content">
        <h2 className="card-title">{travel.title}</h2>
        <p className="card-description">
          {travel.description.length > 100
            ? `${travel.description.substring(0, 100)}...`
            : travel.description}
        </p>
        <a href={travel.url} className="read-more" target="_blank" rel="noopener noreferrer">
          อ่านต่อ
        </a>

        <div className="card-tags">
          <span className="tags-label">หมวด</span>
          {travel.tags.map((tag, index) => (
            <span key={index}>
              <a href="#" className="tag-link">
                {tag}
              </a>
              {index < travel.tags.length - 1 && <span className="tag-separator"> และ </span>}
            </span>
          ))}
        </div>

        <div className="card-thumbnails">
          {thumbnails.map((photo, index) => (
            <img key={index} src={photo} alt={`${travel.title} ${index + 2}`} className="thumbnail" />
          ))}
        </div>
      </div>

      <div className="card-link-icon">
        <button 
          onClick={handleCopyUrl}
          type="button"
          title={copied ? "คัดลอกแล้ว!" : "คัดลอก URL"}
          disabled={copied}
          className="copy-button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5, 2.5)">
              <path d="M4.53867 7.28254L2.30521 9.516C1.47108 10.3501 0.991397 11.4851 1.00016 12.6779C1.00893 13.8707 1.47811 15.0126 2.35183 15.8593C3.19851 16.7331 4.34064 17.2022 5.53326 17.211C6.75309 17.22 7.86119 16.7673 8.69537 15.9332L10.9288 13.6997M13.7816 10.9015L16.0151 8.66801C16.8492 7.83387 17.3289 6.69891 17.3201 5.5061C17.3114 4.31328 16.8422 3.1714 15.9685 2.32466C15.122 1.47818 13.9801 1.00897 12.7872 1.0002C11.5944 0.991437 10.4593 1.44389 9.62514 2.27805L7.39168 4.5115M5.77326 12.4192L12.4736 5.71881" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
