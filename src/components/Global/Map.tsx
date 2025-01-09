import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type MapType = {
  Latitude: number;
  Longitude: number;
  Address: string;
};

interface MapProps {
  data: MapType;
}

const Map = ({ data }: MapProps) => {
  const { Latitude, Longitude, Address } = data;

  return (
    <MapContainer
      center={[Latitude, Longitude]}
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
        center={[Latitude, Longitude]}
        pathOptions={{ color: "#e7816b" }}
        radius={10}
      >
        <Popup>
          <span dangerouslySetInnerHTML={{ __html: Address }} />
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default Map;
