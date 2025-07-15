'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStore } from "@/zustand/store";
export default function LocationPicker() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const { location, pinCode, setLocation, setPinCode, setLat, setLng } = useStore();
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setPosition(coords);
      fetchAddress(coords);
    });
  }, []);

  const fetchAddress = async ({ lat, lng }) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    setAddress(data);
    console.log(data);
    const Location = `${data.address.county}, ${data.address.country}`;
    const PinCode = data.address.postcode;
    const lat1 = data.boundingbox[0];
    const lng1 = data.boundingbox[2];
    console.log(Location, PinCode);
    setLocation(Location);
    setPinCode(PinCode);
    setLat(lat1);
    setLng(lng1)
  };


  const DraggableMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchAddress(e.latlng);
      },
    });

    return position ? (
      <Marker
        draggable={true}
        position={position}
        eventHandlers={{
          dragend: (e) => {
            const newPos = e.target.getLatLng();
            setPosition(newPos);
            fetchAddress(newPos);
          },
        }}
        icon={L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  };

  return (
    <div className="w-full h-[500px] mt-5">
      {position && (
        <>
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg z-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            <DraggableMarker />
          </MapContainer>

          {/* <div className="mt-4 p-2 bg-gray-100 rounded">
            <p><strong>City:</strong> {address?.address?.county ||address?.address?.country}</p>
            <p><strong>Pincode:</strong> {address?.address?.postcode}</p>
          </div> */}
        </>
      )}
    </div>
  );
}
