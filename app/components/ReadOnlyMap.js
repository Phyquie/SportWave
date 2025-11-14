'use client';

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function ReadOnlyMap({ lat, lng, height = "400px", zoom = 14 }) {
  if (!lat || !lng) {
    return (
      <div
        style={{ height }}
        className="w-full flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <p className="text-gray-500">Location not available</p>
      </div>
    );
  }

  const position = [lat, lng];

  return (
    <div style={{ height }} className="w-full mt-4 rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        touchZoom={false}
        keyboard={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
      </MapContainer>
    </div>
  );
}
