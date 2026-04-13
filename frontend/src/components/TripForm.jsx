import { useState } from "react";

function TripForm({ setData }) {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [comfort, setComfort] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    const spotsData = {
      Goa: [
        "Baga Beach", "Chapora Fort", "Anjuna Beach",
        "Calangute Beach", "Dudhsagar Falls", "Fort Aguada"
      ],
      Manali: [
        "Solang Valley", "Rohtang Pass", "Old Manali",
        "Hidimba Temple", "Mall Road", "Jogini Falls"
      ],
      Jaipur: [
        "Hawa Mahal", "Amber Fort", "Nahargarh Fort",
        "City Palace", "Jal Mahal", "Albert Hall Museum"
      ]
    };

    const selectedSpots =
      spotsData[destination] || ["Famous Place 1", "Famous Place 2"];

    const total = Number(budget);

    let stay, travel, food, saved;

    if (comfort === "low") {
      stay = 0.25;
      travel = 0.35;
      food = 0.25;
      saved = 0.15;
    } else if (comfort === "luxury") {
      stay = 0.55;
      travel = 0.25;
      food = 0.15;
      saved = 0.05;
    } else {
      stay = 0.4;
      travel = 0.3;
      food = 0.25;
      saved = 0.05;
    }

    const fakeData = {
      destination,
      total_budget: total,
      breakdown: {
        stay: Math.round(total * stay),
        travel: Math.round(total * travel),
        food: Math.round(total * food),
        saved: Math.round(total * saved)
      },
      comfort,
      instagram_spots: selectedSpots
    };
    // const input = userInput.trim().toLowerCase();
    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(fakeData);
    localStorage.setItem("trips", JSON.stringify(trips));

    setData(fakeData);
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="📍 Destination (Goa, Manali...)"
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="💰 Budget ₹"
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="📅 Days"
          onChange={(e) => setDays(e.target.value)}
          required
        />

        <select onChange={(e) => setComfort(e.target.value)}>
          <option value="low">Low Budget 💸</option>
          <option value="medium">Balanced ⚖️</option>
          <option value="luxury">Luxury ✨</option>
        </select>

        <button type="submit">✨ Plan Trip</button>
      </form>
    </div>
  );
}

export default TripForm;