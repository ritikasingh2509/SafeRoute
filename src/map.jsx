import { useEffect, useState } from "react";
import { safetyData, calculateSafetyScore } from "./data/safetyData.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function FitRoutes({ routes }) {
  const map = useMap();

  useEffect(() => {
    if (!routes.length) return;

    const allPoints = routes.flatMap(route =>
      route.coordinates.map(point => [point[1], point[0]])
    );

    if (allPoints.length) {
      map.fitBounds(L.latLngBounds(allPoints), { padding: [30, 30] });
    }
  }, [routes, map]);

  return null;
}

export default function MapView({ source, destination, searchTrigger }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [center, setCenter] = useState([28.6139, 77.209]);

  useEffect(() => {
    if (!searchTrigger) return;

    async function findRoutes() {
      if (!source.trim() || !destination.trim()) {
        setError("Please enter both starting point and destination.");
        return;
      }

      setLoading(true);
      setError("");
      setRoutes([]);

      try {
        const geocode = async (place) => {
          const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`;
          const response = await fetch(url);
          const data = await response.json();

          if (!data.length) throw new Error(`Location not found: ${place}`);

          return {
            lat: Number(data[0].lat),
            lon: Number(data[0].lon)
          };
        };

        const start = await geocode(source);
        const end = await geocode(destination);

        const routeUrl =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${start.lon},${start.lat};${end.lon},${end.lat}` +
          `?alternatives=true&overview=full&geometries=geojson`;

        const response = await fetch(routeUrl);
        const data = await response.json();

        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("No routes found. Try different locations.");
        }

const searchText = `${source} ${destination}`.toLowerCase();

const matchedArea = safetyData.find(item =>
  searchText.includes(item.area.toLowerCase())
) || safetyData[0];

const areaScore = calculateSafetyScore(matchedArea);

const foundRoutes = data.routes.slice(0, 3).map((route, index) => ({
  id: index + 1,
  coordinates: route.geometry.coordinates,
  distance: (route.distance / 1000).toFixed(1),
  duration: Math.round(route.duration / 60),
  score: areaScore,
  color: ["#16a36a", "#e5a12b", "#df5790"][index],
  dataType: matchedArea.dataType,
  area: matchedArea.area
}));

        setRoutes(foundRoutes);
        setCenter([start.lat, start.lon]);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    findRoutes();
  }, [searchTrigger, source, destination]);

  return (
    <div className="route-area">
      {loading && <p className="route-message">Finding routes for you... ⏳</p>}
      {error && <p className="route-error">{error}</p>}

      {routes.length > 0 && (
        <>
          <div className="route-cards">
            {routes.map((route, index) => (
              <div className="route-card" key={route.id}>
                <div className="route-card-top">
                  <h3>Route {index + 1}</h3>
                  <span style={{ color: route.color }}>
                    {route.score}/100
                  </span>
                </div>
                <p>{route.distance} km · {route.duration} min</p>
                <small>Simulated area-level safety estimate: {route.area}</small>
              </div>
            ))}
          </div>

          <p className="demo-note">
            Demo safety scores are simulated for prototype purposes and are
            not verified real-world safety assessments.
          </p>
        </>
      )}

      <MapContainer
        key={center.join(",")}
        center={center}
        zoom={12}
        style={{ height: "420px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.length > 0 && (
          <>
            <FitRoutes routes={routes} />
            <Marker position={[center[0], center[1]]} icon={markerIcon}>
              <Popup>Starting point</Popup>
            </Marker>
            {routes.map(route => (
              <Polyline
                key={route.id}
                positions={route.coordinates.map(point => [point[1], point[0]])}
                pathOptions={{ color: route.color, weight: 6, opacity: 0.8 }}
              />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
