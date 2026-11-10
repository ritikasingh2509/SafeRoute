
import { useState } from "react";
import "./App.css";
import MapView from "./map.jsx";
import ReportForm from "./ReportForm.jsx";

function App() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <div className="app">
      <nav className="navbar">
        <h2>🛡️ SafeRoute</h2>
        <span>Safer journeys, stronger women.</span>
      </nav>

      <main className="hero">
        <p className="tagline">YOUR SAFETY, OUR PRIORITY</p>

        <h1>
          Not just the fastest route.<br />
          <span>The safer one.</span>
        </h1>

        <p className="subtitle">
          Find safer routes, compare safety scores and travel with confidence.
        </p>

        <section className="search-card">
          <h2>Plan your safe journey</h2>

          <label>Starting point</label>
          <input
            placeholder="e.g. Dwarka, New Delhi"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <label>Destination</label>
          <input
            placeholder="e.g. India Gate, New Delhi"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button onClick={() => setSearchTrigger((prev) => prev + 1)}>
            Find Safe Routes →
          </button>
        </section>

        <section className="map-section">
          <h2>Explore your routes</h2>
          <p>Enter your locations to discover available routes.</p>

          <MapView
            source={source}
            destination={destination}
            searchTrigger={searchTrigger}
          />
          <ReportForm />
        </section>

        <section className="features">
          <div>
            <span>🗺️</span>
            <h3>Smart Routes</h3>
            <p>Compare different travel routes.</p>
          </div>

          <div>
            <span>🛡️</span>
            <h3>Safety Scores</h3>
            <p>Understand route safety indicators.</p>
          </div>

          <div>
            <span>📢</span>
            <h3>Community Reports</h3>
            <p>Share and view safety concerns.</p>
          </div>
        </section>

        <p className="disclaimer">
          SafeRoute is a prototype. Safety scores are illustrative and do not
          guarantee personal safety.
        </p>
      </main>
    </div>
  );
}

export default App;
