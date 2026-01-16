export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <h1 className="header-title">เที่ยวไหนดี</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}
