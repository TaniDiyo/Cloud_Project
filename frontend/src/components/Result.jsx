import Map from "./Map";

// 📸 Image mapping
const images = {
  "Baga Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "Chapora Fort": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "Anjuna Beach": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "Calangute Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "Dudhsagar Falls": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "Fort Aguada": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",

  "Solang Valley": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "Rohtang Pass": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
  "Old Manali": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  "Hidimba Temple": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "Mall Road": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  "Jogini Falls": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",

  "Hawa Mahal": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09f",
  "Amber Fort": "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  "Nahargarh Fort": "https://images.unsplash.com/photo-1609948543911-c8fbb2c41f8f",
  "City Palace": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09f",
  "Jal Mahal": "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  "Albert Hall Museum": "https://images.unsplash.com/photo-1609948543911-c8fbb2c41f8f"
};

function Result({ data }) {
  return (
    <div className="result-container">
      <h2 className="title">{data.destination} Trip ✨</h2>

      {/* 💰 PREMIUM BUDGET SECTION */}
      <div className="budget-section">
        <div className="budget-main-card">
          <h3>Total Budget</h3>
          <h1>₹{data.total_budget}</h1>
          <p>Comfort: {data.comfort}</p>
        </div>

        <div className="budget-grid">
          <div className="budget-card stay">
            <span>🏨</span>
            <h4>Stay</h4>
            <p>₹{data.breakdown.stay}</p>
          </div>

          <div className="budget-card travel">
            <span>🚗</span>
            <h4>Travel</h4>
            <p>₹{data.breakdown.travel}</p>
          </div>

          <div className="budget-card food">
            <span>🍽</span>
            <h4>Food</h4>
            <p>₹{data.breakdown.food}</p>
          </div>

          <div className="budget-card saved">
            <span>💸</span>
            <h4>Saved</h4>
            <p>₹{data.breakdown.saved}</p>
          </div>
        </div>
      </div>

      {/* 📸 INSTAGRAM SPOTS CAROUSEL */}
      <h3 className="subtitle">📸 Instagram Spots</h3>

      <div className="carousel-wrapper">
        <button
          className="scroll-btn"
          onClick={() =>
            document.getElementById("carousel").scrollBy({
              left: -300,
              behavior: "smooth"
            })
          }
        >
          ◀
        </button>

        <div className="carousel" id="carousel">
          {data.instagram_spots.map((spot, i) => (
            <div className="listing-card" key={i}>
              <img
                src={images[spot]}
                alt={spot}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300";
                }}
              />
              <div className="listing-info">
                <h4>{spot}</h4>
              </div>
            </div>
          ))}
        </div>

        <button
          className="scroll-btn"
          onClick={() =>
            document.getElementById("carousel").scrollBy({
              left: 300,
              behavior: "smooth"
            })
          }
        >
          ▶
        </button>
      </div>

      {/* 📍 MAP */}
      <h3 className="subtitle">📍 Location</h3>
      <Map destination={data.destination} />
    </div>
  );
}

export default Result;