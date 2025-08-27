import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ position }) => {
    return (
        <MapContainer
            center={[position.lat, position.long]}
            zoom={position.zoom || 10}
            scrollWheelZoom={true}
            className="rounded-lg h-96 w-full mt-4 shadow-md"
        >
            <MapViewUpdater center={[position.lat, position.long]} zoom={position.zoom || 10}/>
            <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[position.lat, position.long]}>
                <Popup>You are here</Popup>
            </Marker>
        </MapContainer>
    );
};

const MapViewUpdater = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);

    return null;
};

export default MapView;