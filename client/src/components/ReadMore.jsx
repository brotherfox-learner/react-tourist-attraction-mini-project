export default function ReadMore({ url, className = "" }) {
  return (
    <a
      href={url}
      className={` ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>อ่านต่อ</span>
      <svg
        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
    </a>
  );
}
