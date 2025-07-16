"use client";

import { GoogleMap as GoogleMapApi, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

// Default center is Nairobi
const defaultCenter = {
  lat: -1.2921,
  lng: 36.8219,
};

type GoogleMapProps = {
  selectedLocation: { lat: number; lng: number } | null;
  onMapClick: (e: google.maps.MapMouseEvent) => void;
};

export function GoogleMap({ selectedLocation, onMapClick }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
        <div className="w-full h-96 bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4 border border-dashed border-destructive">
            <h3 className="font-semibold text-lg text-destructive-foreground">Google Maps Error</h3>
            <p className="text-sm text-destructive-foreground/80">
                API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
            </p>
        </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMapApi
        mapContainerStyle={containerStyle}
        center={selectedLocation || defaultCenter}
        zoom={selectedLocation ? 15 : 10}
        onClick={onMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMapApi>
    </LoadScript>
  );
}
