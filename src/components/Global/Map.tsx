import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Address } from "./Address";

interface MapProps {
  coordinates: { lat: number; lng: number };
  addressLines: string[];
}

const Map = ({ coordinates, addressLines }: MapProps) => {
  const center: [number, number] = [coordinates.lat, coordinates.lng];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>
OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={center}
        pathOptions={{ color: "#e7816b" }}
        radius={10}
      >
        <Popup>
          <Address lines={addressLines} />
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default Map;
